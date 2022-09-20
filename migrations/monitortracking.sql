CREATE TABLE public.monitortracking (
    "monitorTrackingId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "schoolId" text,
    "scheduleVisitDate" date,
    "visitDate" date,
    feedback text,
    status text,
    created_at timestamp with time zone DEFAULT now(),
    "monitorId" text,
    "lastVisited" date,
    updated_at timestamp with time zone DEFAULT now(),
    "groupId" uuid NOT NULL
);

COMMENT ON COLUMN public.monitortracking."scheduleVisitDate" IS 'The date at which team is scheduled to arrive (sa_school_evaluations.evaluation_date, sa_school_evaluations.school_id, sa_school_evaluations.evaluator_ids to be matched)';
COMMENT ON COLUMN public.monitortracking."visitDate" IS 'actual date of visit done by evaluator';

ALTER TABLE ONLY public.monitortracking
    ADD CONSTRAINT monitortracking_pkey PRIMARY KEY ("monitorTrackingId");

CREATE TRIGGER set_public_monitortracking_updated_at BEFORE UPDATE ON public.monitortracking FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_monitortracking_updated_at ON public.monitortracking IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE ONLY public.monitortracking
    ADD CONSTRAINT "monitortracking_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;