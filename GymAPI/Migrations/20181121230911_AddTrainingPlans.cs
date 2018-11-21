using Microsoft.EntityFrameworkCore.Migrations;

namespace GymAPI.Migrations
{
    public partial class AddTrainingPlans : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId1",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId2",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId3",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId4",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId5",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId6",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId",
                table: "Clients",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                });

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
                name: "IX_Clients_TrainingPlanId",
                table: "Clients",
                column: "TrainingPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Plans_TrainingPlanId",
                table: "Clients",
                column: "TrainingPlanId",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId",
                table: "Exercises",
                column: "TrainingPlanId",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId1",
                table: "Exercises",
                column: "TrainingPlanId1",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId2",
                table: "Exercises",
                column: "TrainingPlanId2",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId3",
                table: "Exercises",
                column: "TrainingPlanId3",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId4",
                table: "Exercises",
                column: "TrainingPlanId4",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId5",
                table: "Exercises",
                column: "TrainingPlanId5",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId6",
                table: "Exercises",
                column: "TrainingPlanId6",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Plans_TrainingPlanId",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId1",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId2",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId3",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId4",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId5",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Plans_TrainingPlanId6",
                table: "Exercises");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TrainingPlanId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TrainingPlanId1",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TrainingPlanId2",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TrainingPlanId3",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TrainingPlanId4",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TrainingPlanId5",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TrainingPlanId6",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Clients_TrainingPlanId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId1",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId2",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId3",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId4",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId5",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId6",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId",
                table: "Clients");
        }
    }
}
