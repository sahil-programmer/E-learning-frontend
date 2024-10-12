import React, { useEffect, useState } from "react";
import "./Lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { toast } from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecloading, setLecLoading] = useState(false);
  const params = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnloading, setBtnLoading] = useState(false);

  // Redirect if user is not admin or not subscribed
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  // Fetch all lectures for the course
  async function fetchLectures() {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/lectures/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLectures(data.lectures);
      setLoading(false);
    } catch (e) {
      toast.error("Failed to load lectures");
      setLoading(false);
    }
  }

  // Fetch individual lecture details
  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/lecture/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      toast.error("Failed to load the lecture");
      setLecLoading(false);
    }
  }

  // Handle video upload and preview
  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  // Submit new lecture form
  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/courses/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add lecture");
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(
          `http://localhost:5000/api/lecture/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  // Fetch lectures on component mount
  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          <div className="left">
            {lecloading ? (
              <Loading />
            ) : (
              <>
                {lecture.video ? (
                  <>
                    <video
                      src={`http://localhost:5000/${lecture.video}`}
                      width={"100%"}
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                      className="video-lecture"
                    ></video>
                    <h1 className="lecture-title">{lecture.title}</h1>
                    <h3 className="lecture-description">
                      {lecture.description}
                    </h3>
                  </>
                ) : (
                  <h1 className="select-lecture-msg">
                    Please Select a Lecture
                  </h1>
                )}
              </>
            )}
          </div>
          <div className="right">
            {user && user.role === "admin" && (
              <button
                className="common-btn add-lecture-btn"
                onClick={() => setShow(!show)}
              >
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="text">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <label htmlFor="text">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <input
                    type="file"
                    placeholder="Choose video"
                    onChange={changeVideoHandler}
                    required
                  />
                  {videoPrev && (
                    <video
                      src={videoPrev}
                      alt="Video preview"
                      width={300}
                      controls
                    ></video>
                  )}
                  <button
                    type="submit"
                    disabled={btnloading}
                    className="common-btn"
                  >
                    {btnloading ? "Please Wait ..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            {lectures && lectures.length > 0 ? (
              lectures.map((e, i) => (
                <div key={i} className="lecture-list-item">
                  <div
                    onClick={() => fetchLecture(e._id)}
                    className={`lecture-number ${
                      lecture._id === e._id ? "active" : ""
                    }`}
                  >
                    {i + 1}. {e.title}
                  </div>
                  {user && user.role === "admin" && (
                    <>
                      <button
                        className="common-btn delete-btn"
                        onClick={() => deleteHandler(e._id)}
                      >
                        Delete {e.title}
                      </button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="no-lectures-msg">No Lectures Yet</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
