<template>
    
    <div class="containerflex wrap">
        <div class="item">
            <NavBarComponent />
        </div> 

        <div style="text-align: center; margin-top: 10%"> <h1>CONECTE-SE AQUI</h1></div>

        <div class="mainContent">
            <div class="item">
                <LoginComponent />
            </div>
            <div class="item">
                <RegisterComponent />        
            </div>
        </div>
    </div>
</template>
<script setup>
import NavBarComponent from '../../NavBarComponent.vue';
import LoginComponent from '../Login/LoginComponent.vue';
import RegisterComponent from '../Cadastro/RegisterComponent.vue';
</script>


<style>
@import '@/assets/Styles/Admin/LoginRegister.css';</style>
