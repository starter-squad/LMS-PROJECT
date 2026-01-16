import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// আপনার এপিআই সার্ভিস ইম্পোর্ট করুন
import { courseService } from "../../api/course.service";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { faGraduationCap, faArrowRight, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Input, message, Spin } from "antd";

// ব্যানার ইমেজ
import bannerImg from "../../assets/images/home-banner.png";

// ১. সংশোধিত CourseCard কম্পোনেন্ট
const CourseCard = ({ course, onDetails }) => (
  <div 
    onClick={onDetails} 
    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer"
  >
    <div className="relative overflow-hidden aspect-video bg-gray-100">
      {/* ব্যাকএন্ড এনটিটি অনুযায়ী ইমেজ পাথ না থাকলে প্লেসহোল্ডার দেখাবে */}
      <img
        src={course.imagePath || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={course.course_name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Metadata Section */}
    <div className="flex gap-2 p-2.5 bg-gray-50 border-b border-gray-100">
      <div className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold text-gray-600">
        ইনস্ট্রাক্টর: {course.instructor || "N/A"}
      </div>
      <div className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-semibold text-blue-600">
        মূল্য: {course.price} BDT
      </div>
    </div>

    {/* Content Section */}
    <div className="p-4 flex flex-col justify-between grow">
      <h3 className="text-[15px] font-bold text-gray-800 leading-snug line-clamp-2 mb-4 group-hover:text-blue-600">
        {course.course_name} {/* ব্যাকএন্ডে ফিল্ডের নাম course_name */}
      </h3>
      
      <button className="w-full py-2.5 bg-gray-100 group-hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
        বিস্তারিত দেখি <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
      </button>
    </div>
  </div>
);

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ২. এপিআই থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const result = await courseService.getAllCourses();
        if (result.success) {
          // প্রথম ৮টি কোর্স দেখানোর জন্য slice করা হয়েছে
          setCourses(result.data.slice(0, 8));
        } else {
          message.error("কোর্স লোড করতে ব্যর্থ হয়েছে");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCounselingSubmit = () => {
    message.success("অনুরোধ জমা হয়েছে। শীঘ্রই যোগাযোগ করা হবে!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-[1150px] mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Unlock Your <span className="text-yellow-400">Learning</span> Journey
            </h1>
            <p className="text-lg text-blue-100 mb-8">দেশসেরা ইনস্ট্রাক্টরদের সাথে লাইভ ক্লাসের মাধ্যমে ক্যারিয়ার শুরু করুন।</p>
            <button 
              onClick={() => navigate("/courses")} 
              className="px-10 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-500 shadow-xl transition-all transform hover:-translate-y-1"
            >
              Browse Courses
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={bannerImg} alt="Banner" className="w-full h-auto max-w-lg rounded-2xl shadow-2xl border-4 border-white/10" />
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl shadow-inner">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 italic">আপকামিং লাইভ কোর্স</h2>
            </div>
            <button onClick={() => navigate("/courses")} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 transition-colors">
              সব দেখুন <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </button>
          </div>

          {/* লোডিং বা কোর্স গ্রিড */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spin size="large" tip="কোর্স লোড হচ্ছে..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard 
                    key={course.course_id} // key হিসেবে course_id ব্যবহার
                    course={course} 
                    // আইডি যাতে undefined না হয় তাই course.course_id ব্যবহার
                    onDetails={() => navigate(`/course/${course.course_id}`)} 
                  />
                ))
              ) : (
                <p className="text-center col-span-full py-10 text-gray-500">কোনো কোর্স পাওয়া যায়নি।</p>
              )}
            </div>
          )}

          <div className="text-center mt-16">
            <button onClick={() => navigate("/courses")} className="px-12 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-xl">
              সব কোর্স দেখুন
            </button>
          </div>

          {/* Counseling Section */}
          <div className="mt-20 bg-white p-10 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
            <div className="flex items-center gap-6">
              <div className="bg-blue-600 p-5 rounded-2xl text-white text-3xl shadow-lg">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">আপনার জন্য সঠিক কোর্স কোনটি?</h3>
                <p className="text-gray-500">আমাদের ক্যারিয়ার গাইডদের সাথে কথা বলুন একদম ফ্রি!</p>
              </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg">
              ফ্রি কাউন্সিলিং নিন
            </button>
          </div>
        </div>
      </section>

      {/* Counseling Modal */}
      <Modal 
        title={<span className="text-xl font-bold">ফ্রি কাউন্সিলিং এর জন্য আপনার তথ্য দিন</span>} 
        open={isModalOpen} 
        onOk={handleCounselingSubmit} 
        onCancel={() => setIsModalOpen(false)}
        okText="অনুরোধ পাঠান"
        cancelText="বাতিল"
      >
        <div className="space-y-5 py-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">আপনার নাম</label>
            <Input placeholder="উদা: মামুন হোসাইন" size="large" className="rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নাম্বার</label>
            <Input placeholder="উদা: 017XXXXXXXX" size="large" className="rounded-lg" />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
             <p className="text-xs text-blue-800 leading-relaxed font-medium">
               * সাবমিট করার ২৪ ঘণ্টার মধ্যে আমাদের একজন ক্যারিয়ার এক্সপার্ট কল দিবেন।
             </p>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}

export default Home;