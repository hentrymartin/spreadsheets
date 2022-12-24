import { FC } from "react";
import { ThreeDots } from "react-loader-spinner";
import { DARK_GREY } from "../../styles/variables/pallete";
import { H1, LoadingWrapper, TitleWrapper, AutoSaveText } from "./Title.styles";

interface TitleProps {
  title: string;
  loading: boolean;
}

export const Title: FC<TitleProps> = ({ title, loading }) => {
  return (
    <TitleWrapper>
      <H1>{title}</H1>
      {loading && (
        <LoadingWrapper>
          <AutoSaveText>Auto saving</AutoSaveText>
          <ThreeDots
            height={24}
            width={24}
            radius={3}
            color={DARK_GREY}
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </LoadingWrapper>
      )}
    </TitleWrapper>
  );
};
