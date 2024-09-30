import React from 'react';

// Sample data for categories
const categories = [
  { id: 1, name: 'LED strips', logo: 'https://static.vecteezy.com/system/resources/previews/036/323/329/original/grow-light-led-strip-colored-icon-or-logo-element-vector.jpg', link: '/LED strips' },
  { id: 2, name: 'LED panels', logo: 'https://eu-cdn.nanoleaf.me/assets/img/products/shapes/owl/triangles/smk/9pk/2-floating-nanoleaf-shapes-light-panels-triangles-starter-kit@1x.png', link: '/LED panels' },
  { id: 3, name: 'Posters', logo: 'https://i.ebayimg.com/images/g/OmIAAOSw2G5kT3LU/s-l1200.webp', link: '/home-garden' },
  { id: 4, name: 'Chairs', logo: 'https://workspace.com.pk/wp-content/uploads/2023/03/gaming-chair-post-07-700x700-1.jpg', link: '/sports' },
  { id: 5, name: 'Desks', logo: 'https://images.thdstatic.com/productImages/b13f63d9-af2d-462f-a503-2b942b750214/svn/black-carbon-fiber-bestier-gaming-desks-d471z-gamd-31_600.jpg', link: '/toys' },
  // Add more categories as needed
];

const BrowseByCategory = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10"> 
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="relative flex items-center justify-center w-40 h-40 bg-white rounded-full shadow-lg overflow-hidden category-item" 
            >
              <img
                src={category.logo}
                alt={category.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center overlay">
                <span className="text-white text-lg font-semibold">{category.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
