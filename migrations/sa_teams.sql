CREATE TABLE public.sa_teams (
    id integer NOT NULL,
    name character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.sa_teams IS 'Teams who will go for spot assessments';

ALTER TABLE ONLY public.sa_teams
    ADD CONSTRAINT sa_teams_pkey PRIMARY KEY (id);