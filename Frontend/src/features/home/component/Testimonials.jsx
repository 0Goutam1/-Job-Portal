import testimonials from "../../../assets/data/testimonials.json";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80";

const Testimonials = () => {
  return (
    <section className="px-[8%] py-[100px]">
      {/* Section Header */}
      <div className="mb-[50px] text-center">
        <h2 className="mb-3 text-[32px] font-bold tracking-[-0.02em] text-[#111827]">
          Candidate Success Validation
        </h2>

        <p className="text-[16px] text-[#64748B]">
          Real metrics from senior developers who discovered structural growth
          trajectories.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
        {testimonials.map((testimonial, index) => {
          const rating = testimonial.rating || 5;

          return (
            <div
              key={testimonial.id || `${testimonial.name}-${index}`}
              className="
                relative
                flex
                flex-col
                justify-between
                rounded-xl
                border
                border-[#E2E8F0]
                bg-[#F8FAFC]
                p-8
              "
            >
              <div>
                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: rating }).map((_, starIndex) => (
                    <i
                      key={starIndex}
                      className="ri-star-fill text-[14px] text-[#F59E0B]"
                    />
                  ))}
                </div>

                {/* Review */}
                <p
                  className="
                    mb-6
                    text-[14px]
                    font-medium
                    leading-[1.6]
                    text-[#111827]
                  "
                >
                  "{testimonial.review}"
                </p>
              </div>

              {/* User Information */}
              <div
                className="
                  mt-auto
                  flex
                  items-center
                  gap-3
                  border-t
                  border-[#E2E8F0]
                  pt-4
                "
              >
                {/* Profile Image */}
                <img
                  src={testimonial.image || DEFAULT_IMAGE}
                  alt={testimonial.name}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                  className="
                    h-11
                    w-11
                    rounded-full
                    border
                    border-[#E2E8F0]
                    object-cover
                  "
                />

                {/* Name + Position */}
                <div>
                  <h4 className="mb-0.5 text-[14px] font-bold text-[#111827]">
                    {testimonial.name}
                  </h4>

                  <p className="text-[12px] font-semibold text-[#64748B]">
                    {testimonial.position} at{" "}
                    <span className="text-[#059669]">
                      {testimonial.company}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
