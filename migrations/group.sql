CREATE TABLE public."group" (
    "groupId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "schoolId" text,
    name text,
    type text,
    section text,
    status text,
    "deactivationReason" text,
    "mediumOfInstruction" text,
    image text,
    "metaData" jsonb,
    option jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    "teacherId" text,
    "gradeLevel" text,
    updated_at timestamp with time zone DEFAULT now(),
    "parentId" uuid
);

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY ("groupId");

CREATE TRIGGER set_public_group_updated_at BEFORE UPDATE ON public."group" FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_group_updated_at ON public."group" IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "group_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;