CREATE TABLE public.sa_orf_assessment_config (
    id integer NOT NULL,
    grade integer NOT NULL,
    subject character varying NOT NULL,
    competency_id integer NOT NULL,
    book_ids character varying[] NOT NULL,
    partner_code character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.sa_orf_assessment_config IS 'Table to store mapping of grade vs book ids';

CREATE SEQUENCE public.sa_assessment_config_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.sa_orf_assessment_config ALTER COLUMN id SET DEFAULT nextval('public.sa_assessment_config_id_seq'::regclass);

ALTER TABLE ONLY public.sa_orf_assessment_config
    ADD CONSTRAINT sa_assessment_config_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sa_orf_assessment_config
    ADD CONSTRAINT sa_orf_assessment_config_competency_id_grade_subject_partner_co UNIQUE (competency_id, grade, subject, partner_code);

CREATE INDEX sa_assessment_config_grade_index ON public.sa_orf_assessment_config USING btree (grade);

CREATE TRIGGER set_public_sa_assessment_config_updated_at BEFORE UPDATE ON public.sa_orf_assessment_config FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_sa_assessment_config_updated_at ON public.sa_orf_assessment_config IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_public_sa_orf_assessment_config_updated_at BEFORE UPDATE ON public.sa_orf_assessment_config FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_sa_orf_assessment_config_updated_at ON public.sa_orf_assessment_config IS 'trigger to set value of column "updated_at" to current timestamp on row update';