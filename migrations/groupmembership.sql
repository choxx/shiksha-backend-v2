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
-- Name: groupmembership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groupmembership (
    "groupMembershipId" uuid NOT NULL,
    "schoolId" text,
    "userId" text,
    role text,
    "groupId" uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text,
    updated_by text,
    status bpchar DEFAULT ''::text NOT NULL
);


ALTER TABLE public.groupmembership OWNER TO postgres;

--
-- Name: groupmembership groupmembership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groupmembership
    ADD CONSTRAINT groupmembership_pkey PRIMARY KEY ("groupMembershipId");


--
-- Name: groupmembership set_public_groupmembership_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_groupmembership_updated_at BEFORE UPDATE ON public.groupmembership FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_groupmembership_updated_at ON groupmembership; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_groupmembership_updated_at ON public.groupmembership IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: groupmembership groupmembership_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groupmembership
    ADD CONSTRAINT "groupmembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

