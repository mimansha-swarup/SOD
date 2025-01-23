"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuestionnaireIds, questionnaireList } from "@/constants/questionnaire";
import { getUserData, updateUserCommunity } from "@/lib/actions/users.action";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "@/utils/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const INITIAL_RECORD = {
  [QuestionnaireIds.MANIFESTATION]: "",
  [QuestionnaireIds.LEVEL]: "",
  [QuestionnaireIds.INCOME]: "",
  [QuestionnaireIds.GOAL]: "",
};
const QuestionnaireContainer = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [record, setRecord] = useState(INITIAL_RECORD);

  const activeSlide = questionnaireList[currentSlide];
  const activeID = activeSlide?.id;
  const isFullBtn = [QuestionnaireIds.START, QuestionnaireIds.GOAL].includes(
    activeSlide?.id
  );

  const userId = auth.currentUser?.uid;
  console.log("userId from questionaire", userId);

  useEffect(() => {
    const storage = getSessionStorage({ fieldName: "questionnaire" });
    setRecord(storage || INITIAL_RECORD);
  }, []);

  const handleRecordChange =
    (fieldName: `${QuestionnaireIds}`) =>
    (event: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof event !== "string" ? event?.target?.value : event;
      setRecord((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    };

  const updateData = async () => {
    const data = {
      income: record[QuestionnaireIds.INCOME],
      manifestation: record[QuestionnaireIds.MANIFESTATION],
      character: record[QuestionnaireIds.LEVEL],
      desiredIncome: record[QuestionnaireIds.GOAL],
    };
    await updateUserCommunity({
      uid: userId,
      community: "SOD",
      dataToUpdate: data,
    });
    removeSessionStorage({ fieldName: "questionnaire" });
    router.push("/");
  };

  const handleNext = async () => {
    if (!currentSlide) {
      setCurrentSlide((prev) => prev + 1);
      return;
    }
    setSessionStorage({ fieldName: "questionnaire", value: record });
    if (currentSlide === questionnaireList.length - 1) {
      await updateData();
      return;
    }
    setCurrentSlide((prev) => prev + 1);
  };

  const handleBack = () => {
    if (!currentSlide) return;
    setCurrentSlide((prev) => prev - 1);
  };

  const setActiveSlide = (index: number) => () => {
    if (index <= currentSlide) setCurrentSlide(index);
  };

  const stepperBg = (idx: number) => {
    if (idx === currentSlide) return "bg-accent hover:bg-accent";
    else if (idx < currentSlide) return "bg-white hover:bg-white";
    return "bg-muted hover:bg-muted";
  };

  const renderInput = (inputType: string) => {
    if (activeID === QuestionnaireIds.START) return;
    switch (inputType) {
      case "Input":
        return (
          <Input
            className="bg-foreground text-muted"
            value={record?.[activeID]}
            onChange={handleRecordChange(activeID)}
            {...activeSlide.input}
          />
        );

      default:
        return <></>;
        break;
    }
  };

  return (
    <div>
      <div className="h-screen pt-8 flex flex-col">
        <div className="flex gap-4 mb-8">
          {questionnaireList.map((_, index) => (
            <Button
              className={cn(
                "flex-1 p-0 h-0.5 rounded-sm  ease-in-out",
                stepperBg(index)
              )}
              onClick={setActiveSlide(index)}
            />
          ))}
        </div>
        <h1 className="text-secondary text-4xl text-center mb-4 font-bold">
          {activeSlide.title}
        </h1>
        <p
          className={cn(
            "text-white text-center",
            activeSlide.id === "Start" ? "my-auto" : "my-6"
          )}
        >
          {activeSlide.description}
        </p>

        {renderInput(activeSlide?.inputType ?? "")}

        <div className="mt-auto mb-8 flex">
          {!isFullBtn && (
            <Button
              onClick={handleBack}
              variant={"outline"}
              className="mr-auto"
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext} className={cn(isFullBtn && "w-full")}>
            {isFullBtn ? activeSlide.id : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireContainer;
