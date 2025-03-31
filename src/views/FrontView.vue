<template>
    <section class="navbar-container">
        <ul class="container-fluid top">
            <li>
                <RouterLink to="/cart">
                    <i class="bi bi-cart3"></i>購物車
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/login">
                    <i class="bi bi-person-circle"></i>會員中心
                </RouterLink>
            </li>
        </ul>
        <nav class="navbar navbar-expand-lg container-lg align-items-center">
            <RouterLink class="d-lg-none ps-2" to="/">
                <h1 class="logo"
                style="background-image:url('/images/logo-white-sm.png')">PURE AURA</h1>
            </RouterLink>
            <input type="checkbox" id="menuToggle">
            <label for="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <div class="navbarMenu">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/products" id="nav-about">
                            全系列商品</RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/" id="nav-news">放鬆解壓</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/" id="nav-system">天然の香</a>
                    </li>
                    <li class="nav-item d-none d-lg-block">
                        <RouterLink class="nav-link" to="/">
                            <h1 class="logo"
                            style="background-image:url('/images/logo-white.png')">PURE AURA</h1>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about" id="nav-solution">關於我們</RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/" id="nav-business">銷售據點</a>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/faq" id="nav-faq">常見問題</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </section>
    <RouterView></RouterView>
    <footer>
        <div class="container-lg mb-5">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-5">
                    <div class="item">
                        <RouterLink to="/">
                            <img src="/images/logo-green.png" alt="PURE AURA">
                        </RouterLink>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-5">
                    <div class="item">
                        <span class="title">CONTACT US</span>
                        <ul class="contact-info">
                            <li>TEL：<a href="tel:2-1234567">02-1234567</a></li>
                            <li>E-MAIL：
                                <a href="mailto:service@pureaura.com">
                                    service@pureaura.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4 col-lg-2">
                    <div class="item">
                        <span class="title">FOLLOW US</span>
                        <ul class="social-icons">
                            <li>
                                <a href="###" target="_blank" class="fb-icon">
                                    <i class="bi bi-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="###" target="_blank" class="line-icon">
                                    <i class="bi bi-line"></i>
                                </a>
                            </li>
                            <li>
                                <a href="###" target="_blank" class="ig-icon">
                                    <i class="bi bi-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-lg bottom">
            <div>
                Copyright @ PURE AURA 草本心語股份有限公司 All rights reserved. <a href="/">隱私權政策</a>
            </div>
        </div>
    </footer>
</template>
