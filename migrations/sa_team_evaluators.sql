CREATE TABLE public.sa_team_evaluators (
    id integer NOT NULL,
    team_id integer NOT NULL,
    evaluator_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.sa_team_evaluators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.sa_team_evaluators ALTER COLUMN id SET DEFAULT nextval('public.sa_team_evaluators_id_seq'::regclass);

ALTER TABLE ONLY public.sa_team_evaluators
    ADD CONSTRAINT sa_team_evaluators_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sa_team_evaluators
    ADD CONSTRAINT sa_team_evaluators_team_id_evaluator_id_key UNIQUE (team_id, evaluator_id);

ALTER TABLE ONLY public.sa_team_evaluators
    ADD CONSTRAINT sa_team_evaluators_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.sa_teams(id) ON UPDATE CASCADE ON DELETE RESTRICT;