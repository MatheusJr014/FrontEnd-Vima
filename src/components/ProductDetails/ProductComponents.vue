<template>
    <div class="product-container container-fluid" v-if="product">
        <div class="row">
            <!-- Coluna da imagem do produto -->
            <div class="col-md-5">
                <div class="product-img">
                    <div class="carousel">
                        <div class="carousel-inner">
                            <div v-for="(image, index) in images" :key="index" :class="{ 'carousel-item': true, active: index === currentIndex }">
                                <img :src="image.src" class="d-block w-100" :alt="'Slide ' + index">
                            </div>
                        </div>
                        <a class="carousel-control-prev" @click="prevSlide" role="button">
                            <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                        </a>
                        <a class="carousel-control-next" @click="nextSlide" role="button">
                            <span class="carousel-control-next-icon" aria-hidden="false"></span>
                        </a>
                    </div>
                    <div class="carousel-thumbnails">
                        <img v-for="(image, index) in images" :key="index" :src="image.src" class="thumbnail" :class="{ active: index === currentIndex }" @click="changeSlide(index)">
                    </div>
                </div>
            </div>

            <!-- Coluna das informações do produto -->
            <div class="col-md-7">
                <h1><strong>{{ product.nome }}</strong></h1>
                <div class="preco">
                    <h3><strong>R$&nbsp;{{ product.preco }}</strong></h3>
                </div>

                <!-- Tabela de Medidas (Descontos por Quantidade) -->
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Desconto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(discount, index) in discounts" :key="index">
                            <th scope="row">{{ discount.quantity }}</th>
                            <td>{{ discount.percent }}% OFF</td>
                        </tr>
                    </tbody>
                </table>

                <div class="product-input">
                    <p>{{ product.descricao }}</p>

                    <span class="input-heading">Tamanho:</span>
                    <!-- Botões quadrados para seleção de tamanho -->
                    <div class="size-options">
                        <button v-for="size in sizes" :key="size" @click="userData.tamanhos = size" :class="['size-button', { selected: userData.tamanhos === size }]">
                            {{ size }}
                        </button>
                    </div>

                    <span class="input-heading">Quantidade:</span>
                    <!-- Input de quantidade e botão de compra lado a lado -->
                    <div class="quantity-buy">
                        <input type="number" v-model.number="userData.quantidade" class="form-control small-textinput" placeholder="1" min="1" step="1">
                        <button @click="saveProductToCart" class="btn btn-primary bg-dark">Comprar</button>
                    </div>

                    <span v-if="userData.quantidade <= 0" style="color: red;">A quantidade deve ser maior que zero.</span>
                    <h4 class="inventory" v-if="inventory > 0">Restam {{ inventory }} em estoque</h4>
                    <h4 class="inventory" v-else>Sem estoque</h4>
                </div>
            </div>
        </div>
    </div>

    <div v-else>
        <p>Produto não encontrado.</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'; 
import axios from 'axios';
import CarrinhoDataService from '@/services/CarrinhoDataService.js';

export default {
    name: 'SendProductCart', 
    data() {
        return {
            product: null,
            userData: {
                quantidade: 0,
                tamanhos: '',
                imageURL: '',
                product: '',
                preco: 0
            },
            inventory: 0,
            currentIndex: 0,
            images: [],
            sizes: [], 
            discounts: [ 
                { quantity: 2, percent: 5 },
                { quantity: 3, percent: 10 },
                { quantity: 4, percent: 15 },
                { quantity: 5, percent: 20 }
            ]
        };
    },
    methods: {
        async fetchProduct() {
            const productId = this.$route.params.id;
            console.log('ID do produto:', productId); 
            
            try {
                const response = await axios.get(`https://localhost:7077/produto/${productId}`);
                const productData = response.data;
                
                if (productData && productData.nome) {
                    this.product = productData;
                    this.userData.product = productData.nome;
                    this.userData.preco = productData.preco;
                    this.inventory = productData.estoque;
                    this.sizes = productData.tamanhos || [];

                    if (productData.imageURL) {
                        this.images = [{ src: productData.imageURL }];
                    } else {
                        this.images = [];
                    }
                } else {
                    console.error('Produto não encontrado ou resposta inválida:', productData);
                    this.product = null;
                }
            } catch (error) {
                console.error('Erro ao buscar o produto:', error);
                this.product = null;
            }
        },

        saveProductToCart() {
            if (this.userData.quantidade <= 0) {
                alert('A quantidade deve ser maior que zero.');
                return;
            }
        
            if (this.userData.quantidade > this.inventory) {
                alert('Quantidade solicitada maior do que o disponível em estoque.');
                return;
            }
            if (!this.userData.tamanhos) {
                alert('Por favor, selecione um tamanho.');
                return;
            }

            CarrinhoDataService.create(this.userData)
            .then(response => {
                console.log(response.data);
                this.inventory -= this.userData.quantidade;
                this.userData.quantidade = 0;
                alert('Produto adicionado ao carrinho!');
                this.submitted = true;
            })
            .catch(error => {
                console.log(error);
                alert('Ocorreu um erro ao adicionar o produto ao carrinho.');
            });
        },
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        changeSlide(index) {
            this.currentIndex = index;
        }    
    },
    mounted() {
        this.fetchProduct();
    }
}
</script>

<style>

.product-img img {
  width: 100%;
  height: auto;
  border: none;
}

.product-container {
  max-width: 1000px;
  margin: 20px auto;
}

.product-input {
  margin-bottom: 10px;
}

.input-heading {
  font-weight: bold;
  margin-top: 10px;
  display: block;
}

.size-options {
    display: flex;
    gap: 10px; /* Espaçamento entre os botões */
    margin-bottom: 15px;
}

.size-button {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 50px;
    font-size: 1rem;
    cursor: pointer;
}

.size-button.selected {
    background-color: #606264;
    color: white;
    border-color: #000000;
}

.quantity-buy {
    display: flex;
    gap: 10px;
    width: 15rem;
    align-items: center;
}

.small-textinput {
    width: 70px; /* Largura menor para o campo de quantidade */
    text-align: center;
    height: 50px;
}

.btn-primary {
    height: 50px; /* Altura do botão igual ao input */
}

.inventory {
  color: green;
}

.product-container {
  margin-top: 150px;
}

.inventory {
  font-size: small;
}

.carousel {
  position: relative;
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 400px;
}

.carousel-item {
  display: none;
  transition: opacity 0.6s ease-in-out;
}

.carousel-item.active {
  display: block;
}

.carousel img {
  width: 100%;
  height: auto;
}

.carousel-control-prev {
  left: 0;
  color: black;
}

.carousel-control-next {
  right: 0;
  color: black;
}

.carousel-thumbnails {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.carousel-thumbnails img {
  width: 80px;
  height: 80px;
  cursor: pointer;
  margin-right: 5px;
  border: 1px solid #ccc;
}

.thumbnail.active {
  border-color: #007bff;
}
</style>
