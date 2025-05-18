<template>
    <section class="navbar-container">
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
                        <RouterLink class="nav-link"
                         :class="{ active: !$route.query.category && $route.path === '/products' }"
                        to="/products">
                            全系列商品</RouterLink>
                    </li>
                     <li class="nav-item">
                        <RouterLink class="nav-link"
                        :class="{ active: $route.query.category === '天然の香' }"
                        :to="{ name: 'Products', query: { category: '天然の香' }  }">天然の香</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link"
                        :class="{ active: $route.query.category === '舒壓放鬆' }"
                        :to="{ name: 'Products', query: { category: '舒壓放鬆' }  }">舒壓放鬆</RouterLink>
                    </li>
                    <li class="nav-item d-none d-lg-block">
                        <RouterLink class="nav-link" to="/">
                            <h1 class="logo"
                            style="background-image:url('/images/logo-white.png')">PURE AURA</h1>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link"
                        :class="{ active: $route.query.category === '質感提案' }"
                        :to="{ name: 'Products', query: { category: '質感提案' }  }">質感提案</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about"
                        :class="{ active: $route.path === '/about' }">關於我們</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/faq"
                        :class="{ active: $route.path === '/faq' }">常見問題</RouterLink>
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
            <div>所有資料、圖片來源皆取自網路，僅作為個人學習與作品製作之用。</div>
            <div>
                Copyright @ PURE AURA 草本心語股份有限公司 All rights reserved. <a href="/">隱私權政策</a>
            </div>
        </div>
    </footer>
    <div class="cart-btn">
        <RouterLink to="/cart" class="action">
            <span class="num">1</span>
            <i class="bi bi-cart-check"></i>
        </RouterLink>
    </div>
</template>
