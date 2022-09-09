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
-- Name: sa_teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sa_teams (
    id integer NOT NULL,
    name character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sa_teams OWNER TO postgres;

--
-- Name: TABLE sa_teams; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.sa_teams IS 'Teams who will go for spot assessments';


--
-- Name: sa_teams sa_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_teams
    ADD CONSTRAINT sa_teams_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

