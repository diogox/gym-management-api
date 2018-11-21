﻿// <auto-generated />
using System;
using GymAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GymAPI.Migrations
{
    [DbContext(typeof(GymContext))]
    [Migration("20181121195456_AddClientNotification")]
    partial class AddClientNotification
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-preview3-35497");

            modelBuilder.Entity("GymAPI.Models.Client", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Age");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("FirstName");

                    b.Property<float>("HeightInMeters");

                    b.Property<string>("LastName");

                    b.Property<long>("Nif");

                    b.Property<float>("WeightInKg");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("GymAPI.Models.ClientCheckIn", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("At");

                    b.Property<long?>("ClientId");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("ClientCheckIn");
                });

            modelBuilder.Entity("GymAPI.Models.ClientNotification", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("ClientId");

                    b.Property<bool>("IsUnread");

                    b.Property<string>("Message");

                    b.Property<DateTime>("Timestamp");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("ClientNotification");
                });

            modelBuilder.Entity("GymAPI.Models.ClientCheckIn", b =>
                {
                    b.HasOne("GymAPI.Models.Client")
                        .WithMany("CheckInHistory")
                        .HasForeignKey("ClientId");
                });

            modelBuilder.Entity("GymAPI.Models.ClientNotification", b =>
                {
                    b.HasOne("GymAPI.Models.Client")
                        .WithMany("Notifications")
                        .HasForeignKey("ClientId");
                });
#pragma warning restore 612, 618
        }
    }
}