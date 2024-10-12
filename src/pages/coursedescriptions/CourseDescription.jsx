import React, { useEffect, useState } from "react";
import "./CourseDescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import axios from "axios";
const CourseDescription = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();
  const navigate = useNavigate();
  const { fetchUser } = UserData();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `http://localhost:5000/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    console.log(params.id);
    const options = {
      key: "rzp_test_VlXCBZ6qsHVzSm", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "E learning", //your business name
      description: "Learn with joy",
      //   image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        console.log(razorpay_order_id);
        console.log(razorpay_payment_id);
        console.log(razorpay_signature);
        try {
          const { data } = await axios.post(
            `http://localhost:5000/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );
          console.log(razorpay_payment_id);
          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (e) {
          toast.error(e.response.data.message);
          setLoading(false);
        }
      },

      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`http://localhost:5000/${course.image}`}
                  alt=""
                  className="course-image"
                ></img>
                <div className="course-info">
                  <h2> {course.title}</h2>
                  <p> Instructor:{course.createdBy}</p>
                  <p> Duration:{course.duration} week</p>
                </div>
              </div>
              <p>{course.description}</p>
              <p>Let's get Started with course At ₹{course.price}</p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                ></button>
              ) : (
                <button onClick={checkoutHandler} className="common-btn">
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
