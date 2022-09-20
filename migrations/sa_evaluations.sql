CREATE TABLE public.sa_evaluations (
    id integer NOT NULL,
    team_id integer NOT NULL,
    evaluator_id text NOT NULL,
    designation character varying NOT NULL,
    district character varying NOT NULL,
    block character varying NOT NULL,
    cluster character varying NOT NULL
);

CREATE SEQUENCE public.sa_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.sa_evaluations ALTER COLUMN id SET DEFAULT nextval('public.sa_evaluations_id_seq'::regclass);

ALTER TABLE ONLY public.sa_evaluations
    ADD CONSTRAINT sa_evaluations_pkey PRIMARY KEY (id);


CREATE INDEX sa_evaluator_id_index ON public.sa_evaluations USING btree (evaluator_id);

ALTER TABLE ONLY public.sa_evaluations
    ADD CONSTRAINT sa_evaluations_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.sa_teams(id) ON UPDATE CASCADE ON DELETE RESTRICT;