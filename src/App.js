import { Provider } from "react-redux";
import "./App.css";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./component/MainContainer";
import WatchPage from "./component/WatchPage";
import Demo from "./component/Demo";
import LiveStream from "./component/LiveStream";
import SearchResults from "./component/SearchResults";
import RootContainer from "./component/RootContainer";
// import Head from "./component/Head";
import Abc from "./component/Abc";

import LogRocket from "logrocket";
import { useEffect } from "react";
// LogRocket.init('ewzwcy/retube')

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootContainer />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "abc",
        element: <Abc />,
      },
      {
        path: "results",
        element: <SearchResults />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "demo",
        element: <Demo />,
      },
      {
        path: "live",
        element: <LiveStream />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}>
        <RootContainer />
      </RouterProvider>
    </Provider>
  );
}

/**
 * Head
 * Body
 *  Sidebar
 *    MenuItems
 * MainContainer
 *  ButtonLst
 *  VideoContainer
 *    VideoCard
 *
 * WatchPage
 *    Video
 *    ActionCard (Like, Share etc.)
 *    NestedComments
 *    OtherSuggestedVideos
 *    if(stream) LiveChat
 *
 */

export default App;
