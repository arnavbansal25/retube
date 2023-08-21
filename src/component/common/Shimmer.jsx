const Shimmer = () => {
  return (
    <div className="flex flex-wrap" data-testid="shimmer">
      {Array(20)
        .fill("")
        .map((e, index) => (
          <div key={index} className="mt-6 mr-4 flex flex-col gap-2">
            <div
              key={index}
              className="bg-selectedGrayBG w-72 h-44 rounded-lg"
            ></div>
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-10 h-10 bg-selectedGrayBG"></div>
              <div className="flex flex-col gap-2">
                <div className="w-52 h-3 bg-selectedGrayBG"></div>
                <div className="w-44 h-3 bg-selectedGrayBG"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
