"use client";
import Comments from "@/components/comments";
import { fakeNew } from "@/uititiles/fakeNews";
import { slideImages } from "@/uititiles/slideImages";
import emailjs from "@emailjs/browser";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import Countdown from "react-countdown";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle, AiOutlineMail } from "react-icons/ai";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import Modal from "react-modal";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as yup from "yup";
import styles from "./page.module.css";
const schema = yup
  .object({
    name: yup.string(),
    phone: yup
      .string()
      .required()
      .matches(
        /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
        "Số điện thoại không đúng định dạng"
      ),
    comment: yup.string(),
  })
  .required();
const renderer_count_down = ({ days, hours, minutes, seconds, completed }) => {
  return (
    <div className={styles.count_down_block}>
      <div className={styles.count_down_item}>
        <p>0{days}</p>
        <h6>Days</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{hours}</p>
        <h6>Hours</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{minutes}</p>
        <h6>Min</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{seconds}</p>
        <h6>Sec</h6>
      </div>
    </div>
  );
};
export default function Home() {
  const myRef = useRef(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const createNotification = () => {
    const index = Math.floor(Math.random() * fakeNew.length);
    toast(
      <div className={styles.toasty}>
        <div className={styles.toasty_icon}>
          <div className={styles.toasty_circle}></div>
        </div>
        <div className={styles.toasty_content}>
          <p className={styles.toasty_title}>{fakeNew[index].phone}</p>
          <p className={styles.toasty_item}>{fakeNew[index].content}</p>
          <p className={styles.toasty_item}>{fakeNew[index].time}</p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const timer = setInterval(() => createNotification(), 15000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    emailjs
      .send(
        "service_foaaq8j",
        "template_28g1phs",
        {
          name: data.name,
          phone: data.phone,
          comment: data.comment,
        },
        "df0MrLw8_uYtCSlSB"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
          emailjs
            .send(
              "service_p2gadnw",
              "template_2e6m17n",
              {
                name: data.name,
                phone: data.phone,
                comment: data.comment,
              },
              "1YqUmC0z-ppEde3FB"
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
                emailjs
                  .send(
                    "service_j61n9x3",
                    "template_44ftm9t",
                    {
                      name: data.name,
                      phone: data.phone,
                      comment: data.comment,
                    },
                    "sKT2lVisEx8tOCjhW"
                  )
                  .then(
                    function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                    },
                    function (error) {
                      console.log("FAILED...", error);
                    }
                  );
              }
            );
        }
      );
    setIsOpen(true);
  };
  const settings = {
    customPaging: function (i) {
      return (
        <div className={styles.slide_paging}>
          <img src={slideImages[i]} />
        </div>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots-custom slick-thumb",
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="images/logo.png" />
        </div>
        <div
          className={styles.btn_buy_now}
          onClick={() => {
            myRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Đăng kí mua ngay
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.slogan}>
          <p>Điều Hoà Thông Minh</p>
          <span>Thiết kế nhỏ gọn làm lạnh nhanh</span>
        </div>
        <div className={styles.banner_img}>
          <img src="images/product.png" />
        </div>
        <div className={styles.banner_price}>
          <div
            className={styles.btn_buy_now}
            style={{ height: 50 }}
            onClick={() => {
              myRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Đăng kí mua ngay
          </div>
          <div className={styles.banner_price_only}>
            <p>Giá chỉ</p>
            <h3>3.750.000đ</h3>
          </div>
        </div>
      </div>
      <div className={styles.adve}>
        <h3>Điều Hoà Mini Chất Lượng Cao</h3>
        <p>Làm lạnh nhanh tích kiệm điện</p>
        <p>
          Điều hòa thông minh di động có thiết kế nhỏ gọn và linh động, nhưng
          tích hợp đầy đủ tính năng thông minh 3 trong 1 - Làm mát - Hút ẩm- Chế
          độ suởi.
        </p>
      </div>
      <div className={styles.slide}>
        <Slider {...settings}>
          {slideImages.map((item, index) => {
            return (
              <div key={index} className={styles.home_slide_item}>
                <img alt="" src={item} />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className={styles.paragraph}>
        <p>
          Sản phẩm điều hòa mini di động được ra mắt vào năm 2020, ngay lập tức
          đã trở thành sản phẩm hot trên thị trường và được nhiều người lựa chọn
          “giải nhiệt” cho mùa hè oi bức. Đây là dòng sản phẩm điều hòa rất
          Smart, nhờ thiết kế thông minh 2 bộ phận cục nóng và lạnh trên cùng 1
          thiết bị, nên máy điều hòa mini không cần lắp đặt như các dòng gắn
          tường thông thường và có thể di chuyển linh động. Dòng điều hòa có
          thiết kế nhỏ gọn, linh động nhưng tích hợp đầy đủ tính năng thông minh
          3 trong 1 - làm mát- hút ẩm- chế độ suởi.
        </p>
      </div>
      <div className={styles.post_img}>
        <img src="images/show.jpg" />
      </div>
      <div className={styles.promotion}>
        <p className={styles.promotion_discount}>Ưu đãi giảm giá</p>
        <p className={styles.promotion_old_price}>5.450.000đ</p>
      </div>
      <div className={styles.flash_sale}>
        <p className={styles.flash_sale_new_price}>3.750.000đ</p>
        <div className={styles.flash_sale_line}></div>
        <Countdown
          date={Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 26}
          renderer={renderer_count_down}
        />
      </div>
      <div className={styles.product_detail}>
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>CHI TIẾT SẢN PHẨM</div>
          <table className={styles.table}>
            <tr>
              <td>Mẫu mã</td>
              <td>KZY-11</td>
              <td>Dòng điện định mức</td>
              <td>1.34A</td>
            </tr>
            <tr>
              <td>Kiểu loại</td>
              <td>Mini/Di động</td>
              <td>Mức độ ồn</td>
              <td>≤38dB(A)</td>
            </tr>
            <tr>
              <td>Điều khiển</td>
              <td>Từ xa / Cảm ứng</td>
              <td>Gas làm lạnh</td>
              <td>R290</td>
            </tr>
            <tr>
              <td>Chức năng</td>
              <td>Điều hòa / Sưởi/ Hút Ẩm</td>
              <td>Kích thước máy</td>
              <td>285*460*230</td>
            </tr>
            <tr>
              <td>Công suất làm lạnh</td>
              <td>2480BTU</td>
              <td>Công suất sưởi</td>
              <td>3000BTU</td>
            </tr>
            <tr>
              <td>Công suất tiêu thụ điện</td>
              <td>280W</td>
              <td>Khối lượng</td>
              <td>9kg/10kg</td>
            </tr>
            {/* <tr>
              <td>Nguồn điện</td>
              <td>220V~50Hz/60Hz</td>
              <td>Dây cáp điện</td>
              <td>1,500mm</td>
            </tr> */}
          </table>
        </div>
        {/* <div className={styles.product_video}>
          <video controls>
            <source src="https://s3.eu-west-1.amazonaws.com/www.bristolberlin.com/media/functions/IMG_0315.MOV" />
          </video>
        </div> */}
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>TÍNH NĂNG</div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Máy nén piston hoạt động mạnh mẽ</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Làm mát nhanh</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Tùy chỉnh tốc độ quạt gió</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Gas R290 hiệu suất cao thân thiện với môi trường</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Tiết kiệm năng lượng</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Chế độ hút ẩm</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Động cơ DC không chổi than</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>{`Tiếng ồn thấp<38 dB (A)`}</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Thiết kế sang trọng phù hợp với mọi không gian</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Bảng điều khiển & điều khiển từ xa</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Công nghệ 3 trong 1 (làm mát, hút ẩm và chế độ suởi) </b>
          </div>
        </div>
      </div>
      <div ref={myRef}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
          <div className={styles.login_form_title}>Đặt hàng ngay tại đây</div>
          <div className={styles.form_item}>
            <input
              className={styles.input_form}
              {...register("name")}
              placeholder="Họ Tên"
              autoComplete="do-not-autofill"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className={styles.form_item}>
            <input
              className={styles.input_form}
              {...register("phone")}
              placeholder="Số điện thoại"
              autoComplete="do-not-autofill"
            />
            <p>{errors.phone?.message}</p>
          </div>
          <div className={styles.form_item}>
            <textarea
              className={styles.textarea_form}
              rows={5}
              {...register("comment")}
              placeholder="Phản hồi tới nhà phân phối"
            />
            <p>{errors.address?.message}</p>
          </div>
          <div className={styles.form_submit}>
            <button className={styles.btn_buy_now} type="submit">
              Đặt Hàng Ngay
            </button>
          </div>
        </form>
      </div>
      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Điều hoà thông minh di động</p>
          <h6>
            Tích hợp công nghệ hút ẩm, tự động phát hiện độ ẩm phòng theo thời
            gian thực. Khi độ ẩm quá cao máy sẽ tự động hút ẩm và ngừng lại khi
            độ ẩm đã đến ngưỡng cài đặt. Công nghệ hút ẩm sẽ giúp hút sạch không
            khí ẩm trong phòng, nhất là những ngày mưa hay mùa nồm, mang đến cho
            không gian khô thoáng, thoải mái, sạch sẽ. Hạn chế nấm mốc, bảo vệ
            sức khỏe các thành viên trong gia đình.
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/hut-am.jpg" />
        </div>
      </div>

      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Làm mát nhanh chóng, hoạt động êm ái </p>
          <h6>
            Công suất làm lạnh 2480BTU cùng tính năng máy nén piston hoạt động
            mạnh mẽ đạt được tần số tối đa ngay từ khi khởi động để tăng tốc
            thời gian làm mát phòng. Nhờ vậy, bạn không phải chờ đợi quá lâu để
            tận hưởng những làn gió mát lạnh giữa ngày hè nắng nóng. Khả năng
            làm mát nhanh chóng cùng khả năng vận hành êm ái sẽ đảm bảo mang đến
            giấc ngủ êm đềm
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/sleep.jpg" />
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.post_img}>
          <img src="images/kichthuoc.jpg" />
        </div>
        <div className={styles.post_content}>
          <p>Chế độ sưởi ấm thông minh không gây khô da, lọc bụi mịn</p>
          <h6>
            Chế độ nóng của điều hoà, hay còn gọi là chế độ sưởi ấm chỉ có ở
            điều hoà 2 chiều. Ngoài 1 chiều làm mát không khí trong những ngày
            nóng bức mùa hè, điều hoà mini còn có chế độ sưởi ấm để dùng vào mùa
            đông với công suất 3000BTU. Sử dụng điều hoà 2 chiều có chế độ sưởi
            ấm sẽ giúp giữ ấm cho cơ thể khi thời tiết quá lạnh, đặc biệt là các
            gia đình có người già và trẻ em với những tính năng thông minh như
            không làm khô da, tiết kiệm điện, lọc khuẩn, lọc bụi trong không
            khí....
          </h6>
        </div>
      </div>
      <Comments />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        <div className={styles.login_form_title}>Đặt hàng ngay tại đây</div>
        <div className={styles.form_item}>
          <input
            className={styles.input_form}
            {...register("name")}
            placeholder="Họ Tên"
            autoComplete="do-not-autofill"
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className={styles.form_item}>
          <input
            className={styles.input_form}
            {...register("phone")}
            placeholder="Số điện thoại"
            autoComplete="do-not-autofill"
          />
          <p>{errors.phone?.message}</p>
        </div>
        <div className={styles.form_item}>
          <textarea
            className={styles.textarea_form}
            rows={5}
            {...register("comment")}
            placeholder="Phản hồi tới nhà phân phối"
          />
          <p>{errors.address?.message}</p>
        </div>
        <div className={styles.form_submit}>
          <button className={styles.btn_buy_now} type="submit">
            Đặt Hàng Ngay
          </button>
        </div>
      </form>
      <div className={styles.footer}>
        <div className={styles.footer_bg}></div>
        <div className={styles.footer_box}>
          <div className={styles.footer_title}>Đại lý uỷ quyền</div>
        </div>
        <div className={styles.footer_contact}>
          <FaHome style={{ marginRight: 10, fontSize: 25 }} />
          <p>Số 86 Nguyễn Đổng Chi, Cầu Diễn, Nam Từ Liêm, Hà Nội</p>
        </div>
        <div className={styles.footer_contact}>
          <FaPhoneAlt style={{ marginRight: 10, fontSize: 20 }} />
          <p>0965183143</p>
        </div>
        <div className={styles.footer_contact}>
          <AiOutlineMail style={{ marginRight: 10, fontSize: 20 }} />
          <p>dieuhoamini247@gmail.com</p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
      >
        <div className={styles.modal_content}>
          <img src="images/success-icon.png" />
          <h6>ĐẶT HÀNG THÀNH CÔNG</h6>
          <p>
            Cám ơn quý khách đã mua hàng tại <span>namia.com.vn</span>
          </p>
          <p>
            Nhân viên chúng tôi sẽ sớm liên hệ với Quý khách trong thời gian sớm
            nhất.
          </p>
          <p>
            Nếu Quý Khách có thắc mắc, xin vui lòng liên hệ số hotline
            <a href={`tel:0965183143`}>
              {" "}
              <span>0965183143</span>.
            </a>
          </p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
      <ToastContainer
        className={styles.toast_container}
        bodyClassName={styles.toasty_body}
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        limit={1}
      />
      <div className={styles.fix_tel}>
        <a href={`tel:0965183143`}>
          <FaPhoneAlt />
        </a>
      </div>
    </div>
  );
}
