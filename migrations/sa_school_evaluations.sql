CREATE TABLE public.sa_school_evaluations (
    id integer NOT NULL,
    school_id integer NOT NULL,
    evaluation_status boolean DEFAULT false NOT NULL,
    team_id integer NOT NULL,
    evaluation_date date NOT NULL,
    evaluator_ids character varying[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);

CREATE SEQUENCE public.sa_school_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.sa_school_evaluations ALTER COLUMN id SET DEFAULT nextval('public.sa_school_evaluations_id_seq'::regclass);

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_school_id_team_id_evaluation_date_key UNIQUE (school_id, team_id, evaluation_date);

CREATE TRIGGER set_public_sa_school_evaluations_updated_at BEFORE UPDATE ON public.sa_school_evaluations FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_sa_school_evaluations_updated_at ON public.sa_school_evaluations IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.sa_teams(id) ON UPDATE CASCADE ON DELETE RESTRICT;