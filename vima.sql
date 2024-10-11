-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11/10/2024 às 16:23
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `vima`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrinhos`
--

CREATE TABLE `carrinhos` (
  `Id` int(11) NOT NULL,
  `Quantidade` int(11) NOT NULL,
  `Tamanhos` longtext NOT NULL,
  `Product` longtext NOT NULL,
  `Preco` decimal(65,30) NOT NULL,
  `ImageURL` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `carrinhos`
--

INSERT INTO `carrinhos` (`Id`, `Quantidade`, `Tamanhos`, `Product`, `Preco`, `ImageURL`) VALUES
(8, 7, 'M', 'Camiseta Tony Country', 219.000000000000000000000000000000, '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contatos`
--

CREATE TABLE `contatos` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Sobrenome` varchar(50) NOT NULL,
  `Email` longtext NOT NULL,
  `Assunto` varchar(100) NOT NULL,
  `Description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Preco` decimal(65,30) NOT NULL,
  `Descricao` varchar(500) NOT NULL,
  `Estoque` int(11) NOT NULL,
  `Tamanhos` longtext NOT NULL,
  `Imagens` longtext NOT NULL,
  `ImageURL` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`Id`, `Nome`, `Preco`, `Descricao`, `Estoque`, `Tamanhos`, `Imagens`, `ImageURL`) VALUES
(83, 'Camiseta Tony Country', 219.000000000000000000000000000000, '', 21, 'P,M,G', '', 'https://cdn.awsli.com.br/600x1000/787/787834/produto/172332293/738693c61d.jpg'),
(84, 'Camiseta Zoi de Gato', 219.000000000000000000000000000000, '', 50, 'G', '', 'https://cdn.awsli.com.br/600x1000/787/787834/produto/185550003/6e0130726c.jpg'),
(85, 'Camiseta GoodFellas', 219.000000000000000000000000000000, '', 50, 'G', '', 'https://cdn.awsli.com.br/600x1000/787/787834/produto/303816142/-32423-vtxxo6ph9l.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Nome` longtext NOT NULL,
  `Sobrenome` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Senha` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20240926185914_InitialMigration', '8.0.5'),
('20240927014629_Imagens', '8.0.5'),
('20241009210419_NomeDaMigracao', '8.0.5'),
('20241009210526_NomeDaMigracao', '8.0.5'),
('20241009210642_NomeDaMigracao2', '8.0.5'),
('20241009220255_NomeDaMigracao23', '8.0.5'),
('20241009220405_NomeDaMigracao234', '8.0.5');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `carrinhos`
--
ALTER TABLE `carrinhos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `contatos`
--
ALTER TABLE `contatos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `carrinhos`
--
ALTER TABLE `carrinhos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `contatos`
--
ALTER TABLE `contatos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
