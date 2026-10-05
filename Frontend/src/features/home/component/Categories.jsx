import categories from "../../../assets/data/categories.json";
import { useNavigate } from "react-router";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/jobs?category=${encodeURIComponent(slug || "")}`);
  };

  return (
    <section className="bg-[#F8FAFC] px-[8%] py-[100px]">
      {/* Section Header */}
      <div className="mb-[50px] text-center">
        <h2 className="mb-3 text-[32px] font-bold tracking-[-0.02em] text-[#111827]">
          Browse Corporate Verticals
        </h2>

        <p className="text-[16px] text-[#64748B]">
          Explore live openings distributed across high-scale industrial
          domains.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
        {categories.map((category) => (
          <div
            key={category.slug || category.name}
            onClick={() => handleCategoryClick(category.slug || category.name)}
            className="
              flex
              cursor-pointer
              flex-col
              justify-between
              rounded-xl
              border
              border-[#E2E8F0]
              bg-white
              p-7
              transition-all
              duration-[400ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              hover:-translate-y-1
              hover:border-[#059669]
              hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]
            "
          >
            <div>
              {/* Category Icon */}
              <div
                className="
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-lg
                  bg-[rgba(5,150,105,0.08)]
                  text-[20px]
                  text-[#059669]
                "
              >
                <i
                  className={
                    category.icon || "ri-briefcase-line"
                  }
                />
              </div>

              {/* Category Name */}
              <h3 className="mb-1.5 text-[17px] font-bold text-[#111827]">
                {category.name || "Category"}
              </h3>

              {/* Description */}
              <p className="mb-4 text-[13px] leading-[1.4] text-[#64748B]">
                {category.description || ""}
              </p>
            </div>

            {/* Openings */}
            <span
              className="
                inline-flex
                items-center
                gap-1
                text-[13px]
                font-semibold
                text-[#059669]
              "
            >
              {category.jobs || 0} Openings

              <i className="ri-arrow-right-line" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
