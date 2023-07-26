import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text_center">
        Dicover and share Awesome
        <br className="max-md:hidden" />
        <span className="green_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        AI prompter is an application that allows users to create and share
        creative and powerful prompts world wide!
      </p>
      <Feed />
    </section>
  );
};

export default Home;
