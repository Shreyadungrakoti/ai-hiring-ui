import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { TrendingUp, Users, Clock, Target, Zap, CheckCircle } from 'lucide-react';

export default function StatsCarousel() {
  const stats = [
    {
      id: 1,
      icon: <Clock size={32} />,
      value: "90%",
      label: "Time Saved",
      description: "Reduce screening time from weeks to hours"
    },
    {
      id: 2,
      icon: <Users size={32} />,
      value: "10,000+",
      label: "Candidates Screened",
      description: "Successfully matched across industries"
    },
    {
      id: 3,
      icon: <Target size={32} />,
      value: "95%",
      label: "Match Accuracy",
      description: "AI-powered precision matching"
    },
    {
      id: 4,
      icon: <TrendingUp size={32} />,
      value: "3x",
      label: "Faster Hiring",
      description: "Get quality candidates in days, not months"
    },
    {
      id: 5,
      icon: <Zap size={32} />,
      value: "60%",
      label: "Cost Reduction",
      description: "Lower cost-per-hire with automation"
    },
    {
      id: 6,
      icon: <CheckCircle size={32} />,
      value: "85%",
      label: "Success Rate",
      description: "Candidates pass final interviews"
    }
  ];

  return (
    <section className="landingStats">
      <div className="landingStatsContent">
        <div className="landingSectionHeader">
          <h2 className="landingSectionTitle">Results That Speak</h2>
          <p className="landingSectionSubtitle">
            Real metrics from real recruiting teams
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="statsSwiper"
        >
          {stats.map((stat) => (
            <SwiperSlide key={stat.id}>
              <div className="statCard">
                <div className="statIcon">{stat.icon}</div>
                <div className="statValue">{stat.value}</div>
                <div className="statLabel">{stat.label}</div>
                <div className="statDescription">{stat.description}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
