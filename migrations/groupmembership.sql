CREATE TABLE public.groupmembership (
    "groupMembershipId" uuid NOT NULL,
    "schoolId" text,
    "userId" text,
    role text,
    "groupId" uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text,
    updated_by text,
    status bpchar DEFAULT ''::text NOT NULL
);

ALTER TABLE ONLY public.groupmembership
    ADD CONSTRAINT groupmembership_pkey PRIMARY KEY ("groupMembershipId");

CREATE TRIGGER set_public_groupmembership_updated_at BEFORE UPDATE ON public.groupmembership FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_groupmembership_updated_at ON public.groupmembership IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE ONLY public.groupmembership
    ADD CONSTRAINT "groupmembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;