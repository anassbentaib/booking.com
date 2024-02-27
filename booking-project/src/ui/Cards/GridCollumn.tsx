// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Grid } from "swiper/modules";

// interface GridCollumnProps {
//   img?: string;
//   price?: number;
// }
// export default function GridCollumn({ img, price }: GridCollumnProps) {
//   return (
//     <section className="">
//       <div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
//         <Swiper
//           modules={[Grid, Pagination, Navigation]}
//           slidesPerView={3}
//           spaceBetween={10}
//           // pagination={{
//           //   clickable: true,
//           // }}
//           breakpoints={{
//             0: {
//               slidesPerView: 1,
//             },
//             700: {
//               slidesPerView: 2,
//             },
//             1000: {
//               slidesPerView: 3,
//             },
//           }}
//           navigation
//           grid={{
//             rows: 3,
//           }}
//           className="gridCol"
//         >
//           <SwiperSlide>
//             <div className="p-5 ">
//               <div>
//                 <div className="h-[200px] cursor-pointer overflow-hidden">
//                   <img
//                     className="scale-1 hover:scale-[1.1] duration-300"
//                     src={img}
//                     alt=""
//                   />
//                 </div>
//                 <p className="">{price}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </section>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";

const tourList = [
  {
    img: "https://images.pexels.com/photos/8146867/pexels-photo-8146867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/8140618/pexels-photo-8140618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/8140616/pexels-photo-8140616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/12206326/pexels-photo-12206326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/12203069/pexels-photo-12203069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/12199896/pexels-photo-12199896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/12476350/pexels-photo-12476350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/12935835/pexels-photo-12935835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/12935835/pexels-photo-12935835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/1862000/pexels-photo-1862000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/7549833/pexels-photo-7549833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/4273765/pexels-photo-4273765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/13007192/pexels-photo-13007192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/13007192/pexels-photo-13007192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/9936956/pexels-photo-9936956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/6202920/pexels-photo-6202920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
  {
    img: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "price",
    priceOff: "$290",
    priceSale: "$200",
    title: "tourist areas",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fugit. Dolorem eveniet esse odio cum harum voluptatum reprehenderit consequuntur quisquam sint? Autem, minima nulla! Sunt, error non. Inventore, dolores ea.",
    more: "Click To View Detail",
  },
];

interface GridCollumnProps {
  img?: string;
  price?: string;
  category?: string;
}

export default function GridCollumn({
  category,
  img,
  price,
}: GridCollumnProps) {
  return (
    <section className="">
      <div className="lg:mx-auto max-w-5xl m">
        <Swiper
          modules={[Grid, Pagination, Navigation]}
          slidesPerView={3}
          spaceBetween={13}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            700: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 3,
            },
          }}
          navigation
          grid={{
            rows: 3,
          }}
          className="gridCol"
        >
          {tourList.map((p) => {
            return (
              <SwiperSlide>
                <div className="gap-5">
                  <div>
                    <div className="h-[200px] cursor-pointer overflow-hidden rounded-md">
                      <img
                        className="scale-1 hover:scale-[1.1] duration-300 rounded-md"
                        src={img}
                        alt=""
                      />
                    </div>
                    <p className="font-bold text-sm pt-2">{category}</p>
                    <p className=" text-[13px] ">MAD {price}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
