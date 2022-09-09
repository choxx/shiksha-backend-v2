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
-- Name: sa_school_evaluations; Type: TABLE; Schema: public; Owner: postgres
--

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


ALTER TABLE public.sa_school_evaluations OWNER TO postgres;

--
-- Name: sa_school_evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sa_school_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sa_school_evaluations_id_seq OWNER TO postgres;

--
-- Name: sa_school_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sa_school_evaluations_id_seq OWNED BY public.sa_school_evaluations.id;


--
-- Name: sa_school_evaluations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_school_evaluations ALTER COLUMN id SET DEFAULT nextval('public.sa_school_evaluations_id_seq'::regclass);


--
-- Name: sa_school_evaluations sa_school_evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_pkey PRIMARY KEY (id);


--
-- Name: sa_school_evaluations sa_school_evaluations_school_id_team_id_evaluation_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_school_id_team_id_evaluation_date_key UNIQUE (school_id, team_id, evaluation_date);


--
-- Name: sa_school_evaluations set_public_sa_school_evaluations_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_sa_school_evaluations_updated_at BEFORE UPDATE ON public.sa_school_evaluations FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_sa_school_evaluations_updated_at ON sa_school_evaluations; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_sa_school_evaluations_updated_at ON public.sa_school_evaluations IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: sa_school_evaluations sa_school_evaluations_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: sa_school_evaluations sa_school_evaluations_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_school_evaluations
    ADD CONSTRAINT sa_school_evaluations_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.sa_teams(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

