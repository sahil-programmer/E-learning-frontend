import React from "react";
import "./testimonials.css"; // Assuming you'll create this CSS file

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Rahul Sharma",
      position: "B.Tech Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image: "https://randomuser.me/api/portraits/men/31.jpg", // Indian male version
    },
    {
      id: 2,
      name: "Priya Gupta",
      position: "MBA Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image: "https://randomuser.me/api/portraits/women/11.jpg", // Indian female version
    },
    {
      id: 3,
      name: "Aditi Verma",
      position: "M.Sc Student",
      message:
        "The flexibility of the courses has been a game changer for my studies. Highly recommend!",
      image: "https://randomuser.me/api/portraits/women/21.jpg", // Indian female version
    },
    {
      id: 4,
      name: "Vikram Rao",
      position: "B.Com Student",
      message:
        "Fantastic experience! The support from the instructors is excellent and the resources are top-notch.",
      image: "https://randomuser.me/api/portraits/men/32.jpg", // Indian male version
    },
    {
      id: 5,
      name: "Rohit Singh",
      position: "M.Tech Student",
      message:
        "The best part of this platform is the hands-on experience provided by the courses. It has really helped me improve my skills.",
      image: "https://randomuser.me/api/portraits/men/33.jpg", // Indian male version
    },
    {
      id: 6,
      name: "Sonal Desai",
      position: "Ph.D. Researcher",
      message:
        "A wonderful platform for anyone looking to enhance their learning. The comprehensive material has been extremely helpful.",
      image: "https://randomuser.me/api/portraits/women/31.jpg", // Indian female version
    },
    {
      id: 7,
      name: "Ananya Sinha",
      position: "B.Sc Student",
      message:
        "Great learning experience with top instructors and excellent content. I've really benefited from the quizzes and assignments.",
      image: "https://randomuser.me/api/portraits/women/32.jpg", // Indian female version
    },
    {
      id: 8,
      name: "Arjun Kapoor",
      position: "BCA Student",
      message:
        "The platform's structure and ease of use have made learning enjoyable. The courses have helped me improve my career prospects.",
      image: "https://randomuser.me/api/portraits/men/34.jpg", // Indian male version
    },
    {
      id: 9,
      name: "Neha Malhotra",
      position: "M.A. Student",
      message:
        "Amazing experience! The courses are well-structured, and the support from the instructors has been phenomenal.",
      image: "https://randomuser.me/api/portraits/women/33.jpg", // Indian female version
    },
    {
      id: 10,
      name: "Ravi Patel",
      position: "BBA Student",
      message:
        "Highly recommend this platform for anyone looking to learn at their own pace. The resources are extensive and of high quality.",
      image: "https://randomuser.me/api/portraits/men/35.jpg", // Indian male version
    },
  ];

  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-image"
            />
            <h3>{testimonial.name}</h3>
            <p className="testimonial-position">{testimonial.position}</p>
            <p className="testimonial-message">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
