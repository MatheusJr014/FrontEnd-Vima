<template>
  <div class="checkout-container">
    <main class="content-wrapper">
      <section class="checkout">
        <h4>Checkout</h4>
        <table class="product-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço Uni</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>-</th> <!-- Coluna para o botão de remover -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carrinho" :key="item.id">
              <td class="product-details">
                <img :src="item.imagemURL" class="product-img" alt="image">
                <div class="product-info">
                  <p>{{ item.product }}</p>
                </div>
              </td>
              <td>{{ formatarPreco(item.preco) }}</td>
              <td>
                <div class="quantity-btns">
                  <button @click="aumentaQuantidade(item.id)" class="quantity-btn">+</button>
                  <input v-model="item.quantidade" @input="atualizaQuantidade(item)" class="quantity-input" type="number" min="1" readonly>
                  <button @click="diminuiQuantidade(item.id)" class="quantity-btn">-</button>
                </div>
              </td>
              <td>{{ formatarPreco(item.preco * item.quantidade) }}</td>
              <td>
                <button @click="removerProduto(item.id)" class="remove">remover</button> <!-- Botão de remover -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="checkout-actions">
          <button class="continue-btn">
            <RouterLink class="nav-link" to="/">Continuar comprando</RouterLink></button>
          <button class="checkout-btn">Finalizar Pedido</button>
        </div>
      </section>

      <aside class="order-summary">
        <h4>Resumo do Pedido</h4>
        <p>Total <span>{{ formatarPreco(total) }}</span></p>
        <p>Desconto <span>{{ desconto }}</span></p>
        <p>Entrega <button class="btn-calculate">Calcular</button></p>
        <p>Cupom de desconto <button class="btn-add-coupon">Adicionar</button></p>
        <hr>
        <p>Total: <span>{{ formatarPreco(total) }}</span></p>
        <p class="installments">Em até 2x de {{ formatarPreco(total / 2) }} sem juros</p>
      </aside>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      carrinho: [],
      total: 0,
      desconto: '0%'
    };
  },
  mounted() {
    this.getCarrinho();
  },
  methods: {
    async getCarrinho() {
      try {
        const response = await axios.get('https://localhost:7077/api/Carrinho/get');
        this.carrinho = response.data.$values;
        this.calculateTotal(); 
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      }
    },
    formatarPreco(preco) {
      return preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    },
    removerProduto(idProduct) {
      axios.delete(`https://localhost:7077/api/Carrinho/delete/${idProduct}`)
        .then(response => {
          console.log("Produto removido com sucesso:", response.data);
          this.getCarrinho();
        })
        .catch(error => {
          console.error("Erro ao remover produto:", error);
        });
    },
    aumentaQuantidade(idProduct) {
      const produto = this.carrinho.find(produto => produto.id === idProduct);
      produto.quantidade++;
      this.updateProduct(produto);
    },
    diminuiQuantidade(idProduct) {
      const produto = this.carrinho.find(produto => produto.id === idProduct);
      if (produto.quantidade > 1) {
        produto.quantidade--;
        this.updateProduct(produto);
      }
    },
    atualizaQuantidade(produto) {
      if (produto.quantidade < 1) {
        produto.quantidade = 1;
      }
      this.updateProduct(produto);
    },
    updateProduct(produto) {
      axios.put(`https://localhost:7077/api/Carrinho/update/${produto.id}`, {
        quantidade: produto.quantidade,
        product: produto.product,
        imageURL: produto.imageURL,
        tamanhos: produto.tamanhos
      })
        .then(response => {
          console.log("Produto atualizado com sucesso:", response.data);
          this.calculateTotal();
        })
        .catch(error => {
          console.error("Erro ao atualizar produto:", error);
        });
    },
    calculateTotal() {
      let total = 0;
      let desconto = '0%';

      this.carrinho.forEach(item => {
        const precoTotal = item.preco * item.quantidade;
        total += precoTotal;
      });

      // Aplicando descontos progressivos
      if (this.carrinho.length >= 2 && this.carrinho.length < 3) {
        desconto = '5%';
        total = total - (total * 0.05);
      } else if (this.carrinho.length >= 3 && this.carrinho.length < 4) {
        desconto = '10%';
        total = total - (total * 0.10);
      } else if (this.carrinho.length >= 4 && this.carrinho.length < 5) {
        desconto = '15%';
        total = total - (total * 0.15);
      } else if (this.carrinho.length >= 5) {
        desconto = '20%';
        total = total - (total * 0.20);
      }

      this.total = total;
      this.desconto = desconto;
    }
  }
};

</script>

<style scoped>
.checkout-container {
  font-family: Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
}

.content-wrapper {
  display: flex;
  gap: 20px;
}

.checkout {
  flex: 2;
  padding: 10px;
}

.order-summary {
  flex: 1;
  max-width: 500px;
  padding: 10px;
  background-color: #fff;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 15px;
  border-bottom: 1px solid #f3f3f3;
  text-align: left;
}

.product-table th {
  background-color: #f3f3f3;
}

.product-details {
  display: flex;
  align-items: center;
}

.product-img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 8px;
}

.product-info p {
  margin: 0;
  font-size: 1rem;
}

.remove {
  color: #000000;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  background: none;
}

.quantity-btns {
  display: flex;
  align-items: center;
}

.quantity-btn {
  padding: 5px 10px;
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-input {
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  margin: 0 5px;
}

.checkout-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.checkout-btn {
  border: 5px solid #000000;
  background-color: #000000;
  color: #fff;
  cursor: pointer;
}

.continue-btn {
  background-color: #f3f3f3;
  border: none;
  cursor: pointer;
}

.order-summary h4 {
  margin-bottom: 20px;
}

.order-summary p {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.order-summary hr {
  border: 1px solid #eee;
  margin: 20px 0;
}

.installments {
  color: gray;
  font-size: 0.9rem;
}
</style>
