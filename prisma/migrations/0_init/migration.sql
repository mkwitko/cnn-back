-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATE,
    "deleted" DATE,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "birthdate" DATE,
    "super" INTEGER DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" SERIAL NOT NULL,
    "created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATE,
    "deleted" DATE,
    "name" VARCHAR(255),
    "countryId" INTEGER,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATE,
    "deleted" DATE,
    "name" VARCHAR(255),

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "states_id_key" ON "states"("id");

-- CreateIndex
CREATE UNIQUE INDEX "country_id_key" ON "country"("id");

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

