using Microsoft.EntityFrameworkCore.Migrations;

namespace GymAPI.Migrations
{
    public partial class UpdateSupportTicket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupportTicketMessage_Clients_FromClientId",
                table: "SupportTicketMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_SupportTicketMessage_Staff_FromStaffId",
                table: "SupportTicketMessage");

            migrationBuilder.DropIndex(
                name: "IX_SupportTicketMessage_FromClientId",
                table: "SupportTicketMessage");

            migrationBuilder.DropIndex(
                name: "IX_SupportTicketMessage_FromStaffId",
                table: "SupportTicketMessage");

            migrationBuilder.AddColumn<long>(
                name: "StaffMemberId",
                table: "SupportTickets",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "SupportTickets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "From",
                table: "SupportTicketMessage",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_StaffMemberId",
                table: "SupportTickets",
                column: "StaffMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupportTickets_Staff_StaffMemberId",
                table: "SupportTickets",
                column: "StaffMemberId",
                principalTable: "Staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupportTickets_Staff_StaffMemberId",
                table: "SupportTickets");

            migrationBuilder.DropIndex(
                name: "IX_SupportTickets_StaffMemberId",
                table: "SupportTickets");

            migrationBuilder.DropColumn(
                name: "StaffMemberId",
                table: "SupportTickets");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "SupportTickets");

            migrationBuilder.DropColumn(
                name: "From",
                table: "SupportTicketMessage");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTicketMessage_FromClientId",
                table: "SupportTicketMessage",
                column: "FromClientId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTicketMessage_FromStaffId",
                table: "SupportTicketMessage",
                column: "FromStaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupportTicketMessage_Clients_FromClientId",
                table: "SupportTicketMessage",
                column: "FromClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SupportTicketMessage_Staff_FromStaffId",
                table: "SupportTicketMessage",
                column: "FromStaffId",
                principalTable: "Staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
