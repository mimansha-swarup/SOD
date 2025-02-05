"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { QuestionnaireIds, questionnaireList } from "@/constants/questionnaire";
import {
  completeQuestionnaire,
  updateUserCommunity,
} from "@/lib/actions/users.action";
import { getMasterCommunity } from "@/lib/features/community/community.slice";
import { fetchMasterCommunity } from "@/lib/features/community/community.thunk";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "@/utils/storage";
import { getCommunityId } from "@/utils/tracker";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ICharacter } from "@/types/feature/community";

const INITIAL_RECORD = {
  [QuestionnaireIds.MANIFESTATION]: "",
  [QuestionnaireIds.LEVEL]: {} as ICharacter,
  [QuestionnaireIds.INCOME]: "",
  [QuestionnaireIds.GOAL]: "",
};

const RECORD_KEYS = Object.keys(INITIAL_RECORD);
const QuestionnaireContainer = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [record, setRecord] = useState(INITIAL_RECORD);
  const [isLoading, setIsLoading] = useState(false);

  const { data: selectedCommunity } = useAppSelector(getMasterCommunity);
  const dispatch = useAppDispatch();

  const activeSlide = questionnaireList[currentSlide];
  const activeID = activeSlide?.id;
  const isFullBtn = [QuestionnaireIds.START, QuestionnaireIds.GOAL].includes(
    activeSlide?.id
  );

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const storage = getSessionStorage({ fieldName: "questionnaire" });
    setRecord(storage || INITIAL_RECORD);

    dispatch(fetchMasterCommunity({ communityId: getCommunityId() }));
  }, []);

  const handleRecordChange =
    (fieldName: `${QuestionnaireIds}`) =>
    (event: React.ChangeEvent<HTMLInputElement> | string) => {
      let value: unknown =
        typeof event !== "string" ? event?.target?.value : event;

      if (fieldName === QuestionnaireIds.LEVEL) {
        const obj = selectedCommunity?.characters?.filter(
          (character) => character?.name === value
        )?.[0];
        value = obj;
      }

      setRecord((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    };

  const updateData = async () => {
    console.log("userId from FInish onCLicke: ", userId);
    setIsLoading(true);
    const data = {
      income: record[QuestionnaireIds.INCOME],
      manifestation: record[QuestionnaireIds.MANIFESTATION],
      character: record[QuestionnaireIds.LEVEL],
      desiredIncome: record[QuestionnaireIds.GOAL],
    };
    await updateUserCommunity({
      uid: userId ?? "",
      community: getCommunityId(),
      dataToUpdate: data,
    });
    await completeQuestionnaire({
      uid: userId ?? "",
      community: getCommunityId(),
    });
    removeSessionStorage({ fieldName: "questionnaire" });
    setRecord(INITIAL_RECORD);
    router.push("/");
    setIsLoading(false);
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
    const value = record?.[activeID];
    switch (inputType) {
      case "Input": {
        return (
          <Input
            className="bg-foreground text-muted"
            value={typeof value === "string" ? value : ""}
            onChange={handleRecordChange(activeID)}
            {...activeSlide.input}
          />
        );
      }

      case "Radio": {
        return (
          <RadioGroup
            value={typeof value !== "string" ? value.name : ""}
            onValueChange={handleRecordChange(activeID)}
          >
            {/* @ts-ignore */}
            {selectedCommunity?.characters?.map((character) => (
              <Label
                htmlFor={character?.name}
                key={character?.name}
                className="flex  space-x-2 p-4 bg-background rounded-lg shadow- border  border-white/10 "
              >
                <RadioGroupItem
                  value={character?.name}
                  id={character?.name}
                  className="mt-1"
                />
                <div>
                  <p className="text-lg font-bold">{character?.name}</p>
                  <p className="text-xs">{character?.description} </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        );
      }

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

          <Button
            onClick={handleNext}
            className={cn(isFullBtn && "w-full")}
            loading={isLoading}
            disabled={
              currentSlide !== 0
                ? // @ts-ignore
                  !Boolean(record?.[RECORD_KEYS?.[currentSlide - 1]])
                : false
            }
          >
            {isFullBtn ? activeSlide.id : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireContainer;
