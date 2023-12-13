CREATE TABLE IF NOT EXISTS public.profile
(
    id_user SERIAL PRIMARY KEY,
    name_user character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);
INSERT INTO public.profile (name_user, phone, address) VALUES ('John Doe', '62811111111', 'Surabaya');
INSERT INTO public.profile (name_user, phone, address) VALUES ('Lena', '62822222222', 'Sidoarjo');
