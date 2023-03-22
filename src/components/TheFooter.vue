<template>
  <div class="footer">
    <div class="footer-content">
      <h3>Tiêu chí Shop</h3>
      <p>Với các giải pháp công nghệ tốt nhất, Haravan là tất cả những gì bạn cần để xây dựng thương hiệu
        online,
        thành công trong bán lẻ và marketing đột phá.
      </p>
      <ul class="footer-ul">
        <li><a href=""><i class="fa-brands fa-facebook"></i></a></li>
        <li><a href=""><i class="fa-brands fa-twitter"></i></a></li>
        <li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
        <li><a href=""><i class="fa-brands fa-google-plus-g"></i></a></li>
        <li><a href=""><i class="fa-brands fa-youtube"></i></a></li>
      </ul>
    </div>
    <!-- ---------------------------------------------------------------- -->

    <div class="footer-content">
      <h3>Thông tin liên hệ</h3>
      <p>
        <span><i class="fa-solid fa-location-dot"></i></span>
        Tầng 25, tòa B2 Roman Plaza, Đường Tố Hữu, Quận Nam Từ Liêm, Hà Nội
      </p>
      <p>
        <span><i class="fa-solid fa-phone"></i></span>
        1900.000.XXX
      </p>
      <p>
        <span><i class="fa-solid fa-envelope"></i></span>
        hi@techgo.abc
      </p>
    </div>
    <!-- ---------------------------------------------------------------- -->

    <div class="footer-content">
      <h3>Hỗ trợ khách hàng</h3>
      <ul class="list-ul">
        <li>Tìm kiếm</li>
        <li>Giới thiệu</li>
        <li>Chính sách đổi trả</li>
        <li>Chính sách bảo mật</li>
        <li>Điều khoản dịch vụ</li>
        <li>Liên hệ</li>
      </ul>
    </div>
    <!-- ---------------------------------------------------------------- -->

    <!-- ---------------------------------------------------------------- -->

    <div class="footer-content">
      <h3>Liên kết</h3>
      <ul class="list-ul">
        <li>Sản phẩm khuyến mại</li>
        <li>Sản phẩm nổi bật</li>
        <li>Tất cả sản phẩm</li>
      </ul>
    </div>
    <!-- ---------------------------------------------------------------- -->

    <!-- ---------------------------------------------------------------- -->

    <div class="footer-content">
      <h3>Chính sách</h3>
      <ul class="list-ul">
        <li>Chính sách đổi trả</li>
        <li>Chính sách bán hàng</li>
        <li>Chính sách giao hàng</li>
      </ul>
    </div>
    <!-- ---------------------------------------------------------------- -->
  </div>
</template>

<script>
export default {
  components: {

  }
}
</script>

<style scoped>
.footer {
  margin: 12px 20px;
  display: flex;
}

.footer-ul {
  display: flex;
  margin-top: 22px;

}

.footer-ul a {
  color: black;
  padding: 6px;
  margin-left: 6px;
  border-radius: 4px;
}

.footer-ul a:hover {
  cursor: pointer;
  color: blue;
  border: 1px solid blue;

}

.footer-content {
  margin-left: 32px;
  padding: 8px;
}

.footer-content p {
  margin-left: 6px !important;
}

.footer-content h3 {
  /* margin-left: 6px; */
  font-size: 1rem;
}

.footer-ul li {
  list-style: none;
}

.footer-content {
  width: 20%;
}

.footer-content p {
  margin: 16px 0;
  padding: 0 8px;
}

.list-ul li {
  margin: 12px 24px;
  padding: 0 !important;
}

.fa-solid {
  font-family: 'FontAwesome';
}
</style>