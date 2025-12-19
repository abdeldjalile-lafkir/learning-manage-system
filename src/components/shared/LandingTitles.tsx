import React from "react";

const LandingTitles = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center space-y-4 text-center">
      <h2 className="text-xl my-4 md:text-3xl lg:text-5xl tracking-tighter font-regular">
        {title}
      </h2>
      <p className="text-lg leading-relaxed tracking-tight text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
};

export default LandingTitles;
