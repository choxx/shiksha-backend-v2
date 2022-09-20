CREATE TABLE public.role (
    "roleId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    "parentId" text NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY ("roleId");

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_title_key UNIQUE (title);

CREATE TRIGGER set_public_role_updated_at BEFORE UPDATE ON public.role FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_role_updated_at ON public.role IS 'trigger to set value of column "updated_at" to current timestamp on row update';