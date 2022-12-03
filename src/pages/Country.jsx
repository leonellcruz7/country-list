import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function index(prop) {
  const { isDark } = useSelector((state) => state.country);
  const navigate = useNavigate();
  const params = useParams();
  const country = params.country;
  const [data, setData] = useState();
  const sample = ["asd", "asddsasd", "asdsas"];

  const fetchData = async () => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );
    setData(response.data[0]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`min-h-[100vh] pb-10 w-full ${
        !isDark ? "text-dark bg-light" : "text-grey bg-dark"
      }`}
    >
      <Navbar />
      <div className="">
        <div className="mx-auto w-fit">
          <div
            className="w-full"
            onClick={() => navigate("/")}
          >
            <button className="flex items-center m-4 gap-2 bg-white p-2 cursor-pointer hover:scale-[1.02] transition-[.1s] w-fit">
              <FeatherIcon icon="arrow-left" />
              Back
            </button>
          </div>
          <div className="px-4 flex flex-col md:flex-row gap-4 md:gap-10 items-start">
            <div className="lg:max-w-[700px] min-w-[200px] ">
              {!!data?.flags.svg ? (
                <img
                  src={data?.flags.svg}
                  className=""
                />
              ) : (
                <div className="w-[350px] h-[250px] lg:w-[500px] lg:h-[300px] bg-[#d7d7d7] animate-pulse"></div>
              )}
            </div>

            <div className="">
              <p className="text-[25px] font-[700]">{data?.name.common}</p>
              <div className="md:flex gap-20">
                <div className="mt-6">
                  <p>
                    Native Name:{" "}
                    <span className="font-[300] text-[#646464]">
                      {
                        data?.name.nativeName[
                          Object.keys(data?.name.nativeName)[0]
                        ].official
                      }
                    </span>
                  </p>
                  <p>
                    Population:
                    <span className="font-[300] text-[#646464]">
                      {" "}
                      {data?.population}{" "}
                    </span>
                  </p>
                  <p>
                    Region:
                    <span className="font-[300] text-[#646464]">
                      {" "}
                      {data?.region}
                    </span>
                  </p>
                  <p>
                    Sub Region:
                    <span className="font-[300] text-[#646464]">
                      {" "}
                      {data?.subregion}
                    </span>
                  </p>
                  <p>
                    Capital:
                    <span className="font-[300] text-[#646464]">
                      {" "}
                      {data?.capital}
                    </span>
                  </p>
                </div>
                <div className="mt-6">
                  <p>
                    Top Level Domain:
                    <span className="font-[300] text-[#646464]">
                      {" "}
                      {data?.tld[0]}
                    </span>
                  </p>
                  <p>
                    Currencies:
                    <span className="font-[300] text-[#646464]">
                      {" "}
                      {data?.currencies[Object.keys(data?.currencies)[0]].name}
                    </span>
                  </p>
                  <p>
                    Languages:
                    <span className="font-[300] text-[#646464]">
                      {" "}
                      {data?.languages[Object.keys(data?.languages)[0]]}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p>Border Countries</p>
                <div className="flex items-center gap-2">
                  {data?.borders !== undefined ? (
                    data?.borders.map((item, index) => {
                      return (
                        <Card
                          key={index}
                          code={item}
                        />
                      );
                    })
                  ) : (
                    <Card code={"None"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = (prop) => {
  const { isDark } = useSelector((state) => state.country);
  return (
    <div
      className={`bg-white p-2 w-fit hover:scale-[1.01] transition-[.03s] cursor-pointer ${
        !isDark ? "text-light bg-dark" : "text-dark bg-grey"
      }`}
    >
      {prop.code}
    </div>
  );
};
