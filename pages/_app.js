import "../styles/globals.css";
import SideBar from "../components/sidebar";
import { ThemeProvider, useTheme } from "next-themes";
import { useState } from "react";
import App from "next/app";
import { getProfilePicAndSocial } from "../lib/data";
import ParticlesCpn from "../components/ParticlesCpn";

function MyApp({ Component, pageProps, navData }) {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ParticlesCpn />
      <div className="lg:flex lg:w-3/4 mx-auto">
        <SideBar
          data={navData}
          open={open}
          setOpen={setOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className=" px-0 py-8 z-30 lg:w-full lg:ml-60 p-10 ">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const navData = await getProfilePicAndSocial();
  // console.log(logoData.profile);
  return { ...appProps, navData: navData };
};

export default MyApp;
