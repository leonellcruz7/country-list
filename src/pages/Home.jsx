import { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { fetchCountry } from "../redux/country";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.country);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [countryList, setCountryList] = useState([]);
  const fetch = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setCountryList(response.data);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={`min-h-[100vh] ${isDark ? "bg-dark" : "bg-light"}`}>
      <Navbar />
      <div className="p-4">
        <Search
          value={searchValue}
          setValue={setSearchValue}
        />

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {countryList
            .filter((i) => {
              if (
                i.name.common.toLowerCase().includes(searchValue) ||
                i.region.toLowerCase().includes(searchValue)
              ) {
                return i;
              }
            })
            .map((item, index) => {
              return (
                <CountryCard
                  key={index}
                  country={item}
                  navigate={navigate}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;

const Search = (prop) => {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="pl-14"
        placeholder="Search country"
        value={prop.value}
        onChange={(e) => prop.setValue(e.target.value)}
      />
      <FeatherIcon
        icon="search"
        color="#999"
        className="absolute translate-x-[15px]"
      />
    </div>
  );
};

const CountryCard = (prop) => {
  const { isDark } = useSelector((state) => state.country);
  return (
    <div
      className={`rounded-[5px] w-[300px] mx-auto overflow-hidden flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-[.1s] my-10 ${
        isDark ? "bg-lightDark" : "bg-grey"
      }`}
      onClick={() =>
        prop.navigate(`/${prop.country.name.common.toLowerCase()}`)
      }
    >
      <img
        src={prop.country.flags.svg}
        alt=""
      />
      <div className="p-6">
        <p className={`font-[600] ${!isDark ? "text-dark" : "text-grey"}`}>
          {prop.country.name.common}
        </p>
        <div className="mt-2">
          <p className={`text-[13px] ${!isDark ? "text-dark" : "text-grey"}`}>
            Population: <span>{prop.country.population}</span>
          </p>
          <p className={`text-[13px] ${!isDark ? "text-dark" : "text-grey"}`}>
            Region: <span>{prop.country.region}</span>
          </p>
          <p className={`text-[13px] ${!isDark ? "text-dark" : "text-grey"}`}>
            Capital: <span>{prop.country.capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
