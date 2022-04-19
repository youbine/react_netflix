import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 4.25rem;
  top: 0;
  font-size: 1rem;
  padding: 1.25rem 3.75rem;
  color: white;
  z-index: 60;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.svg`
  margin-top: 0.3rem;
  margin-right: 3rem;
  width: 7rem;
  height: 1.8rem;
  cursor: pointer;
  fill: ${(props) => props.theme.red};
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  font-size: 0.9rem;
  margin-right: 20px;
  color: ${(props) => props.theme.white};
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: color 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
    transition: 0.5s;
  }
`;
const Search = styled.form`
  cursor: pointer;
  right: 1rem;
  display: flex;
  align-items: center;
  color: white;
  svg {
    height: 1.5rem;
  }
  position: relative;
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  height: 2.5rem;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 1rem;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white};
  ::placeholder {
    color: ${(props) => props.theme.white};
  }
`;
const Bell = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
`;
const navVariants = {
  top: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

function Header() {
  //go to search url
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const seriesMatch = useMatch("series");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      //trigger the close animation
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      //trigger the open animation
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  });
  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Link to="/">
          <Logo
            xmlns="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
            width="1024"
            height="280"
            viewBox="0 0 1024 280"
          >
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Link to="/">
            {(homeMatch && (
              <Item style={{ fontWeight: "bold" }}>Home</Item>
            )) || <Item>Home</Item>}
          </Link>
          <Link to="series">
            {(seriesMatch && (
              <Item style={{ fontWeight: "bold" }}>TV Shows</Item>
            )) || <Item>TV Shows</Item>}
          </Link>
        </Items>
      </Col>
      <Col>
        <Search onChange={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -215 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Movie, TV show, Actor"
          />
        </Search>
        <Bell>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
        </Bell>
      </Col>
    </Nav>
  );
}

export default Header;
