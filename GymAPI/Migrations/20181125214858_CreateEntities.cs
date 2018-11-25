using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GymAPI.Migrations
{
    public partial class CreateEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    TargetMuscleGroup = table.Column<int>(nullable: false),
                    DifficultyLevel = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nif = table.Column<long>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Age = table.Column<int>(nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Rank = table.Column<int>(nullable: false),
                    Salary = table.Column<float>(nullable: false),
                    HasBeenPaidThisMonth = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Equipment",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    BrandName = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    PriceInEuro = table.Column<float>(nullable: false),
                    SupplierName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ExerciseId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Equipment_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    SupervisingTrainerId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plans_Staff_SupervisingTrainerId",
                        column: x => x.SupervisingTrainerId,
                        principalTable: "Staff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nif = table.Column<long>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Age = table.Column<int>(nullable: false),
                    HeightInMeters = table.Column<double>(nullable: false),
                    WeightInKg = table.Column<float>(nullable: false),
                    TrainingPlanId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clients_Plans_TrainingPlanId",
                        column: x => x.TrainingPlanId,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingPlanBlock",
                columns: table => new
                {
                    PlanId = table.Column<long>(nullable: false),
                    ExerciseId = table.Column<long>(nullable: false),
                    NumberOfRepetitions = table.Column<int>(nullable: false),
                    NumberOfSeries = table.Column<int>(nullable: false),
                    DayOfTheWeek = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlanBlock", x => new { x.PlanId, x.ExerciseId, x.DayOfTheWeek, x.NumberOfRepetitions, x.NumberOfSeries });
                    table.ForeignKey(
                        name: "FK_TrainingPlanBlock_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainingPlanBlock_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientCheckIn",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    At = table.Column<DateTime>(nullable: false),
                    ClientId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientCheckIn", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientCheckIn_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientNotification",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Message = table.Column<string>(nullable: true),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    IsUnread = table.Column<bool>(nullable: false),
                    ClientId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientNotification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientNotification_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SupportTickets",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    OpenedAt = table.Column<DateTime>(nullable: false),
                    State = table.Column<int>(nullable: false),
                    ClientId = table.Column<long>(nullable: false),
                    StaffMemberId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportTickets_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupportTickets_Staff_StaffMemberId",
                        column: x => x.StaffMemberId,
                        principalTable: "Staff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SupportTicketMessage",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Message = table.Column<string>(nullable: true),
                    At = table.Column<DateTime>(nullable: false),
                    SupportTicketId = table.Column<long>(nullable: false),
                    FromClientId = table.Column<long>(nullable: false),
                    FromStaffId = table.Column<long>(nullable: false),
                    From = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTicketMessage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportTicketMessage_SupportTickets_SupportTicketId",
                        column: x => x.SupportTicketId,
                        principalTable: "SupportTickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientCheckIn_ClientId",
                table: "ClientCheckIn",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientNotification_ClientId",
                table: "ClientNotification",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_TrainingPlanId",
                table: "Clients",
                column: "TrainingPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipment_ExerciseId",
                table: "Equipment",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_SupervisingTrainerId",
                table: "Plans",
                column: "SupervisingTrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTicketMessage_SupportTicketId",
                table: "SupportTicketMessage",
                column: "SupportTicketId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_ClientId",
                table: "SupportTickets",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_StaffMemberId",
                table: "SupportTickets",
                column: "StaffMemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanBlock_ExerciseId",
                table: "TrainingPlanBlock",
                column: "ExerciseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientCheckIn");

            migrationBuilder.DropTable(
                name: "ClientNotification");

            migrationBuilder.DropTable(
                name: "Equipment");

            migrationBuilder.DropTable(
                name: "SupportTicketMessage");

            migrationBuilder.DropTable(
                name: "TrainingPlanBlock");

            migrationBuilder.DropTable(
                name: "SupportTickets");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "Staff");
        }
    }
}
