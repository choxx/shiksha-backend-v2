--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.23
-- Dumped by pg_dump version 9.6.23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: sa_orf_assessment_config; Type: TABLE; Schema: public; Owner: postgres
--

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


ALTER TABLE public.sa_orf_assessment_config OWNER TO postgres;

--
-- Name: TABLE sa_orf_assessment_config; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.sa_orf_assessment_config IS 'Table to store mapping of grade vs book ids';


--
-- Name: sa_assessment_config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sa_assessment_config_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sa_assessment_config_id_seq OWNER TO postgres;

--
-- Name: sa_assessment_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sa_assessment_config_id_seq OWNED BY public.sa_orf_assessment_config.id;


--
-- Name: sa_orf_assessment_config id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_orf_assessment_config ALTER COLUMN id SET DEFAULT nextval('public.sa_assessment_config_id_seq'::regclass);


--
-- Name: sa_orf_assessment_config sa_assessment_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_orf_assessment_config
    ADD CONSTRAINT sa_assessment_config_pkey PRIMARY KEY (id);


--
-- Name: sa_orf_assessment_config sa_orf_assessment_config_competency_id_grade_subject_partner_co; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_orf_assessment_config
    ADD CONSTRAINT sa_orf_assessment_config_competency_id_grade_subject_partner_co UNIQUE (competency_id, grade, subject, partner_code);


--
-- Name: sa_assessment_config_grade_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sa_assessment_config_grade_index ON public.sa_orf_assessment_config USING btree (grade);


--
-- Name: sa_orf_assessment_config set_public_sa_assessment_config_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_sa_assessment_config_updated_at BEFORE UPDATE ON public.sa_orf_assessment_config FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_sa_assessment_config_updated_at ON sa_orf_assessment_config; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_sa_assessment_config_updated_at ON public.sa_orf_assessment_config IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: sa_orf_assessment_config set_public_sa_orf_assessment_config_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_sa_orf_assessment_config_updated_at BEFORE UPDATE ON public.sa_orf_assessment_config FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_sa_orf_assessment_config_updated_at ON sa_orf_assessment_config; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_sa_orf_assessment_config_updated_at ON public.sa_orf_assessment_config IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- PostgreSQL database dump complete
--

