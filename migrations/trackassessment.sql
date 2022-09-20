CREATE TABLE public.trackassessment (
    "trackAssessmentId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    filter text,
    type text,
    questions text,
    source text,
    score text,
    "totalScore" text,
    "studentId" text NOT NULL,
    "teacherId" text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    answersheet text,
    subject text,
    date date DEFAULT now(),
    status text,
    "groupId" uuid,
    updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE ONLY public.trackassessment
    ADD CONSTRAINT trackassessment_pkey PRIMARY KEY ("trackAssessmentId");

CREATE TRIGGER set_public_trackassessment_updated_at BEFORE UPDATE ON public.trackassessment FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_trackassessment_updated_at ON public.trackassessment IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE ONLY public.trackassessment
    ADD CONSTRAINT "trackassessment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;