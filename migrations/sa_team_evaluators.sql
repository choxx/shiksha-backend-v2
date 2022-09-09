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
-- Name: sa_team_evaluators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sa_team_evaluators (
    id integer NOT NULL,
    team_id integer NOT NULL,
    evaluator_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sa_team_evaluators OWNER TO postgres;

--
-- Name: sa_team_evaluators_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sa_team_evaluators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sa_team_evaluators_id_seq OWNER TO postgres;

--
-- Name: sa_team_evaluators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sa_team_evaluators_id_seq OWNED BY public.sa_team_evaluators.id;


--
-- Name: sa_team_evaluators id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_team_evaluators ALTER COLUMN id SET DEFAULT nextval('public.sa_team_evaluators_id_seq'::regclass);


--
-- Name: sa_team_evaluators sa_team_evaluators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_team_evaluators
    ADD CONSTRAINT sa_team_evaluators_pkey PRIMARY KEY (id);


--
-- Name: sa_team_evaluators sa_team_evaluators_team_id_evaluator_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_team_evaluators
    ADD CONSTRAINT sa_team_evaluators_team_id_evaluator_id_key UNIQUE (team_id, evaluator_id);


--
-- Name: sa_team_evaluators sa_team_evaluators_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_team_evaluators
    ADD CONSTRAINT sa_team_evaluators_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.sa_teams(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

