import StoreProvider from "@/app/StateProvider";
import { Button } from "@/components/ui/button";
import { questionnaireList } from "@/constants/questionnaire";
import QuestionnaireContainer from "@/container/questionnaire";
import React from "react";

const QuestionnairePage = () => {
  return (
    <div className=" h-screen w-screen px-4">
      <StoreProvider>
        <QuestionnaireContainer />
      </StoreProvider>
    </div>
  );
};

export default QuestionnairePage;
