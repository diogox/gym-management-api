using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GymAPI.Migrations
{
    public partial class AddStaffMember : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SupervisingTrainerId",
                table: "Plans",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Clients",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Plans_SupervisingTrainerId",
                table: "Plans",
                column: "SupervisingTrainerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_Staff_SupervisingTrainerId",
                table: "Plans",
                column: "SupervisingTrainerId",
                principalTable: "Staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_Staff_SupervisingTrainerId",
                table: "Plans");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropIndex(
                name: "IX_Plans_SupervisingTrainerId",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "SupervisingTrainerId",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Clients");
        }
    }
}
