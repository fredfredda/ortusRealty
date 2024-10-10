import Home from "./(home)/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "Ortus Realty",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
