using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GymAPI.Migrations
{
    public partial class CreateEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SupervisingTrainerId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plans_Staff_SupervisingTrainerId",
                        column: x => x.SupervisingTrainerId,
                        principalTable: "Staff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    TrainingPlanId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clients_Plans_TrainingPlanId",
                        column: x => x.TrainingPlanId,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                    DifficultyLevel = table.Column<int>(nullable: false),
                    TrainingPlanId = table.Column<long>(nullable: true),
                    TrainingPlanId1 = table.Column<long>(nullable: true),
                    TrainingPlanId2 = table.Column<long>(nullable: true),
                    TrainingPlanId3 = table.Column<long>(nullable: true),
                    TrainingPlanId4 = table.Column<long>(nullable: true),
                    TrainingPlanId5 = table.Column<long>(nullable: true),
                    TrainingPlanId6 = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_TrainingPlanId",
                        column: x => x.TrainingPlanId,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_TrainingPlanId1",
                        column: x => x.TrainingPlanId1,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_TrainingPlanId2",
                        column: x => x.TrainingPlanId2,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_TrainingPlanId3",
                        column: x => x.TrainingPlanId3,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_TrainingPlanId4",
                        column: x => x.TrainingPlanId4,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_TrainingPlanId5",
                        column: x => x.TrainingPlanId5,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_TrainingPlanId6",
                        column: x => x.TrainingPlanId6,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClientCheckIn",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    At = table.Column<DateTime>(nullable: false),
                    ClientId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientCheckIn", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientCheckIn_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    ClientId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientNotification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientNotification_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Equipment",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    BrandName = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    PriceInEuro = table.Column<float>(nullable: false),
                    SupplierName = table.Column<string>(nullable: true),
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
                name: "IX_Exercises_TrainingPlanId",
                table: "Exercises",
                column: "TrainingPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_TrainingPlanId1",
                table: "Exercises",
                column: "TrainingPlanId1");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_TrainingPlanId2",
                table: "Exercises",
                column: "TrainingPlanId2");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_TrainingPlanId3",
                table: "Exercises",
                column: "TrainingPlanId3");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_TrainingPlanId4",
                table: "Exercises",
                column: "TrainingPlanId4");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_TrainingPlanId5",
                table: "Exercises",
                column: "TrainingPlanId5");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_TrainingPlanId6",
                table: "Exercises",
                column: "TrainingPlanId6");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_SupervisingTrainerId",
                table: "Plans",
                column: "SupervisingTrainerId");
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
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "Staff");
        }
    }
}
