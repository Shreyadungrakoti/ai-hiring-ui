import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Head of Talent, TechCorp",
      company: "TechCorp",
      text: "This AI recruiting tool transformed our hiring process. We reduced screening time from weeks to hours and found better candidates than ever before.",
      rating: 5,
      image: "SC"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "VP of HR, StartupHub",
      company: "StartupHub",
      text: "The AI doesn't replace our recruiters—it empowers them. They can focus on building relationships while the AI handles the initial screening brilliantly.",
      rating: 5,
      image: "MR"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Founder & CEO, GrowthLabs",
      company: "GrowthLabs",
      text: "We hired 15 engineers in 2 months using this platform. The quality of candidates was exceptional, and the time savings were incredible.",
      rating: 5,
      image: "PS"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Talent Acquisition Lead, InnovateCo",
      company: "InnovateCo",
      text: "Finally, an AI tool that actually understands technical roles. The match scores are remarkably accurate, and we've cut our cost-per-hire by 60%.",
      rating: 5,
      image: "DK"
    },
    {
      id: 5,
      name: "Emily Watson",
      role: "HR Director, ScaleUp Inc",
      company: "ScaleUp Inc",
      text: "The LinkedIn integration is seamless. We're finding passive candidates we never would have reached manually. Game-changer for our recruiting team.",
      rating: 5,
      image: "EW"
    }
  ];

  return (
    <section className="landingTestimonials">
      <div className="landingTestimonialsContent">
        <div className="landingSectionHeader">
          <h2 className="landingSectionTitle">Loved by Hiring Teams</h2>
          <p className="landingSectionSubtitle">
            See how companies are transforming their recruitment with AI
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={32}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonialsSwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonialCard">
                <div className="testimonialQuote">
                  <Quote size={32} />
                </div>
                <div className="testimonialRating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p className="testimonialText">{testimonial.text}</p>
                <div className="testimonialAuthor">
                  <div className="testimonialAvatar">{testimonial.image}</div>
                  <div className="testimonialInfo">
                    <div className="testimonialName">{testimonial.name}</div>
                    <div className="testimonialRole">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
