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
-- Name: sa_evaluations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sa_evaluations (
    id integer NOT NULL,
    team_id integer NOT NULL,
    evaluator_id text NOT NULL,
    designation character varying NOT NULL,
    district character varying NOT NULL,
    block character varying NOT NULL,
    cluster character varying NOT NULL
);


ALTER TABLE public.sa_evaluations OWNER TO postgres;

--
-- Name: sa_evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sa_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sa_evaluations_id_seq OWNER TO postgres;

--
-- Name: sa_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sa_evaluations_id_seq OWNED BY public.sa_evaluations.id;


--
-- Name: sa_evaluations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_evaluations ALTER COLUMN id SET DEFAULT nextval('public.sa_evaluations_id_seq'::regclass);


--
-- Name: sa_evaluations sa_evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_evaluations
    ADD CONSTRAINT sa_evaluations_pkey PRIMARY KEY (id);


--
-- Name: sa_evaluator_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sa_evaluator_id_index ON public.sa_evaluations USING btree (evaluator_id);


--
-- Name: sa_evaluations sa_evaluations_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_evaluations
    ADD CONSTRAINT sa_evaluations_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.sa_teams(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

